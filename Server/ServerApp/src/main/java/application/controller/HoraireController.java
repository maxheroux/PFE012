package application.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Lists;
import com.google.gson.Gson;

import application.model.User;
import application.model.messages.HoraireChange;
import application.model.messages.HoraireRequest;
import application.model.messages.Schedule;
import application.model.messages.StateChange;
import application.model.peripherals.Peripheral;
import application.model.peripherals.ScheduleDetail;
import application.model.peripherals.State;
import application.repositories.PeripheralRepository;
import application.repositories.StateChangeRepository;
import application.repositories.UserRepository;
import application.utilities.TemperatureAutomaticScheduler;

@RestController
public class HoraireController extends JsonController {

	private static final String HORAIRE_CHANGE = "/horaire/change";
	private static final String HORAIRE_REQUEST = "/horaire/request";
	private static final String HORAIRE_AUTOMATIC = "/horaire/automatic";

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PeripheralRepository peripheralRepository;
	@Autowired
	private StateChangeRepository stateChangeRepository;

	@RequestMapping(value = HORAIRE_REQUEST, method = RequestMethod.POST, consumes = "text/plain")
	public String horaireRequest(@RequestBody String payload) {
		Gson gson = new Gson();
		HoraireRequest request = gson.fromJson(payload, HoraireRequest.class);

		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);

		if (Authenticate(token, user)) {
			List<Schedule> schedules = new ArrayList<>();
			Iterable<Peripheral> peripherals = peripheralRepository.findAll(request.getPeripheralIds());

			for (Peripheral peripheral : peripherals) {
				for (ScheduleDetail detail : peripheral.getSchedules()) {
					schedules.add(new Schedule(peripheral.getId(), detail.getHourOfDay(), detail.getDayOfWeek(),
							detail.getState().getStateValues()));
				}
			}

			return gson.toJson(schedules);
		} else {
			return getBadAuthJsonString();
		}
	}

	@RequestMapping(value = HORAIRE_CHANGE, method = RequestMethod.POST, consumes = "text/plain")
	public String horaireChange(@RequestBody String payload) {
		Gson gson = new Gson();
		HoraireChange request = gson.fromJson(payload, HoraireChange.class);

		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);

		if (Authenticate(token, user)) {
			Set<Peripheral> peripherals = new  HashSet<>() ;
			for (Schedule schedule : request.getScheduleList()) {
				peripherals.add(peripheralRepository.findOne(schedule.getIdPeripheriral()));
			}
			for (Peripheral peripheral : peripherals) {
				peripheral.clearSchedules();
				peripheralRepository.save(peripheral);
			}
			
			for (Schedule schedule : request.getScheduleList()) {
				Peripheral peripheral = peripheralRepository.findOne(schedule.getIdPeripheriral());
				ScheduleDetail detail = new ScheduleDetail(schedule.getHourOfDay(), schedule.getDayOfWeek());
				State state = PeripheralRepository.getNewConcreteState(peripheral.getCurrentState());

				for (Map.Entry<String, String> entry : schedule.getValues().entrySet()) {
					String field = entry.getKey();
					String value = entry.getValue();
					state.setStateValue(field, value);
				}
				detail.setState(state);
				peripheral.setSchedule(detail);
				peripheralRepository.save(peripheral);
			}

			String response = PostPayload(payload, user, HORAIRE_CHANGE);
			return response;
		} else {
			return getBadAuthJsonString();
		}
	}

	@RequestMapping(value = HORAIRE_AUTOMATIC, method = RequestMethod.POST, consumes = "text/plain")
	public String horaireAutomatic(@RequestBody String payload) {
		Gson gson = new Gson();
		HoraireRequest request = gson.fromJson(payload, HoraireRequest.class);

		String username = request.getUsername();
		String token = request.getToken();

		User user = userRepository.findByUsername(username);

		if (Authenticate(token, user)) {
			TemperatureAutomaticScheduler scheduler = new TemperatureAutomaticScheduler(stateChangeRepository);

			List<Schedule> schedules = new ArrayList<>();
			List<Peripheral> peripherals = Lists.newArrayList(peripheralRepository.findAll(request.getPeripheralIds()));

			List<Integer> ids = peripherals.stream().map(Peripheral::getId).collect(Collectors.toList());

			for (Peripheral peripheral : peripherals) {
				List<ScheduleDetail> details = scheduler.getAutomaticHoraire(peripheral.getId());
				for (ScheduleDetail detail : details) {
					schedules.add(new Schedule(peripheral.getId(), detail.getHourOfDay(), detail.getDayOfWeek(),
							detail.getState().getStateValues()));
				}
			}

			return gson.toJson(schedules);
		} else {
			return getBadAuthJsonString();
		}
	}
}
