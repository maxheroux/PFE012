package application.controller;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import application.model.User;
import application.model.messages.StateChange;
import application.model.messages.StateRequest;
import application.repositories.StateChangeRepository;
import application.repositories.StateRequestRepository;
import application.repositories.UserRepository;

@RestController
public class StateController extends JsonController {

	private static final String STATE_CHANGE = "/state/change";
	private static final String STATE_REQUEST = "/state/request";
	@Autowired
	private StateChangeRepository stateChangeRepository;
	@Autowired
	private StateRequestRepository stateRequestRepository;
	@Autowired
	private UserRepository userRepository;


	@PersistenceContext
	private EntityManager entityManager;

	@RequestMapping(value = STATE_REQUEST, method = RequestMethod.POST, consumes = "text/plain")
	public String stateRequest(@RequestBody String payload) {
		Gson gson = new Gson();
		StateRequest request = gson.fromJson(payload, StateRequest.class);
		
		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);
	
		if (Authenticate(token, user)) {
			String response = PostPayload(payload, user, STATE_REQUEST);
			stateRequestRepository.save(request);
			return response;
		}else {
			return getBadAuthJsonString();
		}
	}

	@RequestMapping(value = STATE_CHANGE, method = RequestMethod.POST, consumes = "text/plain")
	public String stateChange(@RequestBody String payload) {
		Gson gson = new Gson();
		StateChange request = gson.fromJson(payload, StateChange.class);

		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);

		if (Authenticate(token, user)) {
			String response = PostPayload(payload, user, STATE_CHANGE);
			request = stateChangeRepository.save(request);
			return response;
		}else {
			return getBadAuthJsonString();
		}
	}
}
