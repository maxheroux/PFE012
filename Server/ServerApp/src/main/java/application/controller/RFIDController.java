package application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import application.model.User;
import application.model.messages.RFIDAddRequest;
import application.repositories.UserRepository;
import application.utilities.AuthenticationFunctions;

@RestController
public class RFIDController extends JsonController {
	
	private static final String RFIDTAG_ADD = "/rfidtag/add";
	
	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(value = RFIDTAG_ADD, method = RequestMethod.POST, consumes = "text/plain")
	public String add(@RequestBody String payload)
	{
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		RFIDAddRequest request = gson.fromJson(payload, RFIDAddRequest.class);
		
		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);
		
		PostPayload(payload, user, RFIDTAG_ADD);
		
		List<String> rfids = user.getRfids();
		
		if (AuthenticationFunctions.isTokenValid(user, token)) {
			rfids.add(request.getTagId());
			user.setRfids(rfids);
			
			userRepository.save(user);
			JsonObject object = new JsonObject();
			object.addProperty("Success", "true");

			return object.toString();
		}
		else {
			return getBadAuthJsonString();
		}
	}

}
