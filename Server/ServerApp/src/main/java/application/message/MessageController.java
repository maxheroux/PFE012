package application.message;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import application.authentication.User;
import application.utilities.AuthenticationFunctions;

@RestController
public class MessageController 
{
	@Autowired
	private MessageRepository messageRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@RequestMapping(value = "/message", method = RequestMethod.POST, consumes = "text/plain")
	public Message message(@RequestBody String payload)
	{
		JsonObject jsonObject = (new JsonParser()).parse(payload).getAsJsonObject();
		
		String username = jsonObject.get("username").toString().replaceAll("\"", "");
		String token = jsonObject.get("token").toString().replaceAll("\"", "");
		
		User user = (User) entityManager.createQuery("from User where username = :username")
				.setParameter("username", username)
				.getSingleResult();
		
		if (AuthenticationFunctions.isTokenValid(user, token))
		{
			String messageType = jsonObject.get("messageType").toString().replaceAll("\"", "");
			String messageValue = jsonObject.get("messageValue").toString().replaceAll("\"", "");
			
			Message newMessage = new Message(messageType, messageValue);
			messageRepository.save(newMessage);
			
			final String uri = user.getPublicIp() + ":" + user.getPort() + "/message";
			
			RestTemplate restTemplate = new RestTemplate();
			/*Message receivedMessage = restTemplate.postForObject(uri, newMessage, Message.class);
			
			return receivedMessage;*/
			return new Message("TYPE", "VALUE");
		}
		else
		{
			return new Message("Token", "BAD_AUTHENTICATION");
		}
	}
}
