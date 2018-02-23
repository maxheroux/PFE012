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
public class StateController 
{
	@Autowired
	private MessageRepository messageRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@RequestMapping(value = "/state/request", method = RequestMethod.POST, consumes = "text/plain")
	public String stateRequest(@RequestBody String payload)
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
			
			final String uri = "http://" + user.getPublicIp() + ":" + user.getPort() + "/state/request";
			
			RestTemplate restTemplate = new RestTemplate();
			String receivedObject = restTemplate.postForObject(uri, payload, String.class);

			return receivedObject;
		}
		else
		{
			JsonObject object = new JsonObject();
			object.addProperty("Token", "BAD_AUTHENTICATION");
			
			return object.toString();
		}
	}
	
	@RequestMapping(value = "/state/change", method = RequestMethod.POST, consumes = "text/plain")
	public String stateChange(@RequestBody String payload)
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
			
			final String uri = "http://" + user.getPublicIp() + ":" + user.getPort() + "/state/change";
			
			RestTemplate restTemplate = new RestTemplate();
			String receivedObject = restTemplate.postForObject(uri, payload, String.class);

			return receivedObject;
		}
		else
		{
			JsonObject object = new JsonObject();
			object.addProperty("Token", "BAD_AUTHENTICATION");
			
			return object.toString();
		}
	}
}
