package application.utilities;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.catalina.startup.HomesUserDatabase;
import org.apache.commons.lang3.tuple.MutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.common.collect.Lists;

import application.model.messages.StateChange;
import application.model.peripherals.ScheduleDetail;
import application.model.peripherals.Thermostat;
import application.repositories.StateChangeRepository;

public class TemperatureAutomaticScheduler {

	public static final String SUPPORTED_VALUE = "desiredTemperature";

	@Autowired
	private StateChangeRepository stateChangeRepository;

	public List<ScheduleDetail> getAutomaticHoraire(List<Integer> peripheralIds) {
		List<ScheduleDetail> details = new ArrayList<>();

		for (Integer id : peripheralIds) {
			ArrayList<Integer> idList = new ArrayList<>();
			idList.add(id);
			details.addAll(getScheduleDetailsFromStateChanges(stateChangeRepository.findAll(idList)));

		}
		Iterable<StateChange> messages = stateChangeRepository.findAll(peripheralIds);
		return details;
	}

	private int getHourOfDay(StateChange message) {
		return message.getDateTime().getHour();
	}

	private int getDayOfWeek(StateChange message) {
		return message.getDateTime().getDayOfWeek().getValue() - 1;
	}
	
	private int getHourOfWeek(StateChange message) {
		
		return getDayOfWeek(message)*getHourOfDay(message);
	}

	private List<ScheduleDetail> getScheduleDetailsFromStateChanges(Iterable<StateChange> messages) {
		List<StateChange> listMessage = Lists.newArrayList(messages);
		listMessage.sort(Comparator.comparing(o -> o.getDateTime()));

		List<ScheduleDetail> schedule = new ArrayList<ScheduleDetail>();
		
		for(StateChange stateChange: listMessage){
		//Set the value up to the end of the week
		168
		
		for (int hourOfWeek = getHourOfWeek(stateChange); hourOfDay <= 167; hourOfWeek++) {
			scheduleValues.get(hourOfWeek % 7).get(hourOfWeek/24);
			MutablePair<Integer, Integer> value = scheduleValues.get(hourOfWeek % 7).get(hourOfWeek/24);
			
			
		}
		
		for (int hourOfDay = getHourOfDay(stateChange); hourOfDay < 24; hourOfDay++) {
			for (int dayOfWeek = getDayOfWeek(stateChange); hourOfDay < 7; dayOfWeek++) {

				MutablePair<Integer, Integer> value = scheduleValues.get(dayOfWeek).get(hourOfDay);
				if (value != null) {

				}
			}
		}
		
		
		
		for (int hourOfDay = getHourOfDay(stateChange); hourOfDay < 24; hourOfDay++) {
			for (int dayOfWeek = getDayOfWeek(stateChange); hourOfDay < 7; dayOfWeek++) {

				MutablePair<Integer, Integer> value = scheduleValues.get(dayOfWeek).get(hourOfDay);
				if (value != null) {

				}
			}
		}
		
		//Looping back around to set the value up to the last set value
		for (int hourOfDay = 0; hourOfDay < 24; hourOfDay++) {
			for (int dayOfWeek = 0; hourOfDay < 7; dayOfWeek++) {

				MutablePair<Integer, Integer> value = scheduleValues.get(dayOfWeek).get(hourOfDay);
				if (value != null) {

				}
			}
		}
	}
		
		
	

//		Map<Integer, Map<Integer, MutablePair<Integer, Integer>>> scheduleValues = new HashMap<>();
//		for (StateChange stateChange : listMessage) {
//			// Map<DayOfWeek, Map<HourOfDay, MutablePair<Value, #Occurences>>>
//
//			MutablePair<Integer, Integer> value = scheduleValues
//					.get(stateChange.getDateTime().getDayOfWeek().getValue() - 1)
//					.get(stateChange.getDateTime().getHour());
//
//			Set<String> keys = stateChange.getValues().keySet();
//			for (String key : keys) {
//				if (key.equals(SUPPORTED_VALUE)) {
//					if (value == null) {
//						value = new MutablePair<>();
//						value.left = Integer.valueOf(stateChange.getValues().get(key));
//						value.right = 1;
//					} else {
//						value.right = value.right + Integer.valueOf(stateChange.getValues().get(key));
//						value.left = Integer.valueOf(stateChange.getValues().get(key));
//					}
//				}
//			}
//		}
//
//		// Initialize every ScheduleDetail with the first state change value
//		StateChange lastScheduleSet = listMessage.get(0);
//		for (int dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
//			for (int hourOfDay = 0; hourOfDay < 24; hourOfDay++) {
//				ScheduleDetail scheduleDetail = new ScheduleDetail(hourOfDay, dayOfWeek);
//				scheduleDetail.setState(new Thermostat(
//						String.valueOf(listMessage.get(0).getValues().get(SUPPORTED_VALUE)), "0", "0", "0"));
//				schedule.add(scheduleDetail);
//			}
//		}
//		
//		for(StateChange stateChange: listMessage){
//			//Set the value up to the end of the week
//			168
//			
//			for (int hourOfWeek = getHourOfWeek(stateChange); hourOfDay <= 167; hourOfWeek++) {
//				scheduleValues.get(hourOfWeek % 7).get(hourOfWeek/24);
//				MutablePair<Integer, Integer> value = scheduleValues.get(hourOfWeek % 7).get(hourOfWeek/24);
//				
//				
//			}
//			
//			for (int hourOfDay = getHourOfDay(stateChange); hourOfDay < 24; hourOfDay++) {
//				for (int dayOfWeek = getDayOfWeek(stateChange); hourOfDay < 7; dayOfWeek++) {
//
//					MutablePair<Integer, Integer> value = scheduleValues.get(dayOfWeek).get(hourOfDay);
//					if (value != null) {
//
//					}
//				}
//			}
//			
//			
//			
//			for (int hourOfDay = getHourOfDay(stateChange); hourOfDay < 24; hourOfDay++) {
//				for (int dayOfWeek = getDayOfWeek(stateChange); hourOfDay < 7; dayOfWeek++) {
//
//					MutablePair<Integer, Integer> value = scheduleValues.get(dayOfWeek).get(hourOfDay);
//					if (value != null) {
//
//					}
//				}
//			}
//			
//			//Looping back around to set the value up to the last set value
//			for (int hourOfDay = 0; hourOfDay < 24; hourOfDay++) {
//				for (int dayOfWeek = 0; hourOfDay < 7; dayOfWeek++) {
//
//					MutablePair<Integer, Integer> value = scheduleValues.get(dayOfWeek).get(hourOfDay);
//					if (value != null) {
//
//					}
//				}
//			}
//		}

		

		return schedule;
	}
}
