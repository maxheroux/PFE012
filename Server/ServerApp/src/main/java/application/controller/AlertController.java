package application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import application.model.Domicile;
import application.model.User;
import application.model.messages.StateRequest;
import application.model.peripherals.Peripheral;
import application.repositories.DomicileRepository;
import application.repositories.UserRepository;
import application.utilities.AuthenticationFunctions;
import application.utilities.PeripheralSerializer;

@RestController
public class AlertController extends JsonController {

	private static final String ALERT_LIST = "/alert/list";
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DomicileRepository domicileRepository;
	
	@RequestMapping(value = ALERT_LIST, method = RequestMethod.POST, consumes = "text/plain")
	public String list(@RequestBody String payload)
	{
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		StateRequest request = gson.fromJson(payload, StateRequest.class);

		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);

		if (AuthenticationFunctions.isTokenValid(user, token)) {
			Domicile dom = domicileRepository.findByUserId(user.getId());
			
			gson = new GsonBuilder().registerTypeAdapter(Peripheral.class, new PeripheralSerializer()).create();
			return gson.toJson(dom.getAlerts());
		} else {
			return getBadAuthJsonString();
		}
	}
}
