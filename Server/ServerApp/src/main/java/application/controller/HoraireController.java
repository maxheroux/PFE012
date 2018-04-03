package application.controller;

import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import application.model.User;
import application.model.messages.HoraireChange;
import application.model.messages.Schedule;
import application.model.messages.StateChange;
import application.model.messages.StateRequest;
import application.model.peripherals.Peripheral;
import application.model.peripherals.ScheduleDetail;
import application.model.peripherals.State;
import application.model.peripherals.StateValue;
import application.repositories.MessageRepository;
import application.repositories.PeripheralRepository;
import application.repositories.ScheduleDetailRepository;
import application.repositories.UserRepository;

@RestController
public class HoraireController extends JsonController {

	private static final String HORAIRE_CHANGE = "/horaire/change";
	private static final String HORAIRE_REQUEST = "/horaire/request";

	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PeripheralRepository peripheralRepository;
	@Autowired
	private ScheduleDetailRepository scheduleDetailRepository;


	@RequestMapping(value = HORAIRE_REQUEST, method = RequestMethod.POST, consumes = "text/plain")
	public String stateRequest(@RequestBody String payload) {
		Gson gson = new Gson();
		StateRequest request = gson.fromJson(payload, StateRequest.class);
		
		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);
	
		if (Authenticate(token, user)) {
			String response = PostPayload(payload, token, user, HORAIRE_REQUEST);
			messageRepository.save(request);
			return response;
		}else {
			return getBadAuthJsonString();
		}
	}

	@RequestMapping(value = HORAIRE_CHANGE, method = RequestMethod.POST, consumes = "text/plain")
	public String stateChange(@RequestBody String payload) {
		Gson gson = new Gson();
		HoraireChange request = gson.fromJson(payload, HoraireChange.class);

		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);
		
		
		if (Authenticate(token, user)) {
			
			for (Schedule schedule : request.getScheduleList()){
				
				Peripheral peri = peripheralRepository.findOne(schedule.getIdPeripheriral());
				ScheduleDetail detail = new ScheduleDetail(schedule.getHourOfDay(), schedule.getDayOfWeek());
				State state = PeripheralRepository.getNewConcreteState(peri.getCurrentState());
				
				for (Map.Entry<String, String> entry : schedule.getValues().entrySet()) {
				    String field = entry.getKey();
				    String value = entry.getValue();
				    state.setStateValue(field, value);
				}
				detail.setState(state);
				peri.setSchedule(detail);
				peripheralRepository.save(peri);
				
				String response = PostPayload(payload, token, user, HORAIRE_CHANGE);
				return response;
			}
			
			return "OK";
		}else {
			return getBadAuthJsonString();
		}
	}
}
