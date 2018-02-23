package application.message;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
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
	
		Gson gson = new Gson();
		StateRequest request = gson.fromJson(payload, StateRequest.class);
		
		String username = request.getUsername();
		String token = request.getToken();
		
		User user = (User) entityManager.createQuery("from User where username = :username")
				.setParameter("username", username)
				.getSingleResult();
		
		if (AuthenticationFunctions.isTokenValid(user, token))
		{
			//messageRepository.save(request);
			
			final String uri = "http://" + user.getPublicIp() + ":" + user.getPort() + "/state/request";
			
			RestTemplate restTemplate = new RestTemplate();
			String receivedObject = restTemplate.postForObject(uri, payload, String.class);
			System.out.println(receivedObject);
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
		Gson gson = new Gson();
		StateChange request = gson.fromJson(payload, StateChange.class);
		
		
		String username = request.getUsername();
		String token = request.getToken();
		
		User user = (User) entityManager.createQuery("from User where username = :username")
				.setParameter("username", username)
				.getSingleResult();
		
		if (AuthenticationFunctions.isTokenValid(user, token))
		{	
			//messageRepository.save(request);
			
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
