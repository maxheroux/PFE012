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
import application.model.messages.AddRequest;
import application.model.messages.StateRequest;
import application.model.peripherals.Peripheral;
import application.model.peripherals.PeripheralBuilder;
import application.repositories.DomicileRepository;
import application.repositories.PeripheralRepository;
import application.repositories.UserRepository;
import application.utilities.AuthenticationFunctions;
import application.utilities.PeripheralSerializer;

@RestController
public class PeripheralController extends JsonController {

	private static final String PERIPHERAL_LIST = "/peripheral/list";
	private static final String PERIPHERAL_ADD = "/peripheral/add";

	@Autowired
	private PeripheralRepository peripheralRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DomicileRepository domicileRepository;

	@RequestMapping(value = PERIPHERAL_LIST, method = RequestMethod.POST, consumes = "text/plain")
	public String list(@RequestBody String payload) {
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		StateRequest request = gson.fromJson(payload, StateRequest.class);

		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);

		if (AuthenticationFunctions.isTokenValid(user, token)) {
			Domicile dom = domicileRepository.findByUserId(user.getId());
			
			gson = new GsonBuilder().registerTypeAdapter(Peripheral.class, new PeripheralSerializer()).create();
			return gson.toJson(dom.getPeripherals());
		} else {
			return getBadAuthJsonString();
		}
	}

	@RequestMapping(value = PERIPHERAL_ADD, method = RequestMethod.POST, consumes = "text/plain")
	public String add(@RequestBody String payload) {
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		AddRequest request = gson.fromJson(payload, AddRequest.class);

		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);

		if (AuthenticationFunctions.isTokenValid(user, token)) {
			Domicile dom = domicileRepository.findByUserId(user.getId());

			PeripheralBuilder builder = new PeripheralBuilder(request.getType(), request.getBluetoothId(),
					request.getName());
			Peripheral newPeripheral = builder.build();
			dom.addPeripheral(newPeripheral);
			peripheralRepository.save(newPeripheral);
			domicileRepository.save(dom);
			PostPayload(payload, user, PERIPHERAL_ADD);
			gson = new GsonBuilder().registerTypeAdapter(Peripheral.class, new PeripheralSerializer()).create();
			return gson.toJson(dom.getPeripherals());
		} else {
			return getBadAuthJsonString();
		}
	}

}
