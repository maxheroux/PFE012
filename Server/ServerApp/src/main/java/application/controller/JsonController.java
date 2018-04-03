package application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonObject;

import application.model.Domicile;
import application.model.User;
import application.repositories.DomicileRepository;
import application.utilities.AuthenticationFunctions;

public abstract class JsonController {

	private static final String HTTP = "http://";
	private static final String TOKEN = "Token";
	private static final String BAD_AUTHENTICATION = "BAD_AUTHENTICATION";

	@Autowired
	private DomicileRepository domicileRepository;
	
	public JsonController() {
		super();
	}

	protected String PostPayload(String payload, User user, String mappingValue) {
		
		Domicile dom = domicileRepository.findByUserId(user.getId());
		
		final String uri = HTTP + dom.getPublicIp() + ":" + dom.getPort() + mappingValue;

		RestTemplate restTemplate = new RestTemplate();
		String receivedObject = "Could not post to "+uri;
		try {
			receivedObject = restTemplate.postForObject(uri, payload, String.class);
		} catch (Exception e) {
		}

		return receivedObject;
	}

	protected boolean Authenticate(String token, User user) {
		return AuthenticationFunctions.isTokenValid(user, token);
	}

	protected String getBadAuthJsonString() {
		JsonObject object = new JsonObject();
		object.addProperty(TOKEN, BAD_AUTHENTICATION);

		return object.toString();
	}

}