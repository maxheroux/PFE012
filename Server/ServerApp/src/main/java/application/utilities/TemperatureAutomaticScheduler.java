package application.utilities;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.tuple.MutablePair;
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
		// TODO: param par Id et non par liste d'id
		List<ScheduleDetail> details = new ArrayList<>();

		for (Integer id : peripheralIds) {
			ArrayList<Integer> idList = new ArrayList<>();
			idList.add(id);
			details.addAll(getScheduleDetailsFromStateChanges(stateChangeRepository.findAll(idList)));

		}

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
		listMessage.sort(Comparator.comparing(o -> getHourOfWeek(o)));
		
		Map<Integer, Map<Integer, MutablePair<Integer, Integer>>> scheduleValues = new HashMap<>();
		
		//Initialize every pair
		for (int hourOfWeek = 0; hourOfWeek <= 167; hourOfWeek++) {
			scheduleValues.get(hourOfWeek/7).put(hourOfWeek%24, new MutablePair<>(new Integer(0), new Integer(0)));
		}
		
		List<ScheduleDetail> schedule = new ArrayList<ScheduleDetail>();
		for(StateChange stateChange: listMessage){
			int dayOfweek = getDayOfWeek(stateChange);
			int hourOfDay = getHourOfDay(stateChange);
			
			Integer value = scheduleValues.get(dayOfweek).get(hourOfDay).getLeft();
			Integer occurences = scheduleValues.get(dayOfweek).get(hourOfDay).getRight();

			value = value + Integer.valueOf(stateChange.getValues().get(SUPPORTED_VALUE));
			occurences = occurences+1;
			
			scheduleValues.get(dayOfweek).get(hourOfDay).setLeft(value);
			scheduleValues.get(dayOfweek).get(hourOfDay).setRight(occurences);
		}
		
		for (int hourOfWeek = 0; hourOfWeek <= 167; hourOfWeek++) {
			Integer value = scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).getLeft();
			Integer occurences = scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).getRight();
			Integer valueMean = 0;
			
			if (occurences == 0){
				Integer previousSetValue =0;
				Integer nextSetValue=0;
				
				for (int hourOfWeekNext = hourOfWeek+1; hourOfWeekNext <= 167; hourOfWeekNext++) {
					Integer nextValue = scheduleValues.get(hourOfWeekNext/7).get(hourOfWeekNext%24).getLeft();
					Integer nextOccurences = scheduleValues.get(hourOfWeekNext/7).get(hourOfWeekNext%24).getRight();
					if (nextOccurences != 0){
						nextSetValue = nextValue/nextOccurences;
						break;
					}
				}
				for (int hourOfWeekPrevious = hourOfWeek-1; hourOfWeekPrevious >= 0; hourOfWeekPrevious--) {
					Integer previousValue = scheduleValues.get(hourOfWeekPrevious/7).get(hourOfWeekPrevious%24).getLeft();
					Integer previousOccurences = scheduleValues.get(hourOfWeekPrevious/7).get(hourOfWeekPrevious%24).getRight();
					if (previousOccurences != 0){
						previousSetValue = previousValue/previousOccurences;
						break;
					}
				}
				
				if (previousSetValue == 0){
					previousSetValue = nextSetValue;
				}else if (nextSetValue == 0){
					nextSetValue = previousSetValue;
				}
				
				valueMean = (previousSetValue+nextSetValue)/2;
			}else{
				valueMean = value/occurences;
			}
			
			ScheduleDetail detail = new ScheduleDetail(hourOfWeek/7,hourOfWeek%24);
			detail.setState(new Thermostat(String.valueOf(valueMean), "0", "0", "0"));
			schedule.add(detail);
		}
		
//		int latestHourOfWeekChange = -1;
//		for(StateChange stateChange: listMessage){
//			//Set the value up to the end of the week
//			for (int hourOfWeek = getHourOfWeek(stateChange); hourOfWeek <= 167; hourOfWeek++) {
//				Integer value = scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).getLeft();
//				Integer occurences = scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).getRight();
//
//				value = value + Integer.valueOf(stateChange.getValues().get(SUPPORTED_VALUE));
//				occurences = occurences+1;
//				
//				scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).setLeft(value);
//				scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).setRight(occurences);
//			}
//			//Loop back and set the value up to the stateChange date
//			for (int hourOfWeek = 0; hourOfWeek < getHourOfWeek(stateChange); hourOfWeek++) {
//				Integer value = scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).getLeft();
//				Integer occurences = scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).getRight();
//
//				value = value + Integer.valueOf(stateChange.getValues().get(SUPPORTED_VALUE));
//				occurences = occurences+1;
//				
//				scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).setLeft(value);
//				scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).setRight(occurences);
//			}
//			latestHourOfWeekChange = getHourOfWeek(stateChange);
//		}
//		
//		//Create every scheduleDetail fro the value pairs
//		for (int hourOfWeek = 0; hourOfWeek <= 167; hourOfWeek++) {
//			Integer value = scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).getLeft();
//			Integer occurences = scheduleValues.get(hourOfWeek/7).get(hourOfWeek%24).getRight();
//			
//			Integer valueMean = value/occurences;
//			
//			ScheduleDetail detail = new ScheduleDetail(hourOfWeek/7,hourOfWeek%24);
//			detail.setState(new Thermostat(String.valueOf(valueMean), "0", "0", "0"));
//			schedule.add(detail);
//		}

		return schedule;
	}
		

}
