package application.message;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import application.authentication.User;
import application.utilities.AuthenticationFunctions;

@RestController
public class MessageController 
{
	@Autowired
	private MessageRepository messageRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@RequestMapping("/message")
	public Message message(@RequestParam(value="username", required = true) String username
			, @RequestParam(value="token", required = true) String token
			, @RequestParam(value="messageType", required = true) String messageType
			, @RequestParam(value="messageValue", required = true) String messageValue)
	{
		User user = (User) entityManager.createQuery("from User where username = :username")
				.setParameter("username", username)
				.getSingleResult();
		
		if (AuthenticationFunctions.isTokenValid(user, token))
		{
			Message message = new Message(messageType, messageValue);
			messageRepository.save(message);
			
			String uri = user.getPublicIp() + ":" + user.getPort() + "/{messageType}/{messageValue}";
			
			Map<String, String> params = new HashMap<String, String>();
			params.put("messageType", messageType);
			params.put("messageValue", messageValue);
			
			RestTemplate restTemplate = new RestTemplate();
			Message myMessage = restTemplate.getForObject(uri, Message.class, params);
			
			return myMessage;
		}
		else
		{
			return new Message("Token", "BAD_AUTHENTICATION");
		}
	}
}
