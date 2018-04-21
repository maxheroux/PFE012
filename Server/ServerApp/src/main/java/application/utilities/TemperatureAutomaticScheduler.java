package application.utilities;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.tuple.MutablePair;

import com.google.common.collect.Lists;

import application.model.messages.StateChange;
import application.model.peripherals.ScheduleDetail;
import application.model.peripherals.Thermostat;
import application.repositories.StateChangeRepository;

public class TemperatureAutomaticScheduler {

	public static final String SUPPORTED_VALUE = "desiredTemperature";

	private StateChangeRepository stateChangeRepository;
	
	public TemperatureAutomaticScheduler(StateChangeRepository stateChangeRepository) {
		this.stateChangeRepository=stateChangeRepository;
	}

	public List<ScheduleDetail> getAutomaticHoraire(int peripheralId) {
		List<ScheduleDetail> details = new ArrayList<>();
		details.addAll(getScheduleDetailsFromStateChanges(stateChangeRepository.findByPeripheralId(peripheralId)));
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
		
		// HourOfWeek, Pair<ValueSum, nbOccurences>
		Map<Integer, MutablePair<Integer, Integer>> scheduleValues = new HashMap<>();
		
		//Initialize every pair
		for (int hourOfWeek = 0; hourOfWeek <= 167; hourOfWeek++) {
			scheduleValues.put(hourOfWeek, new MutablePair<>(new Integer(0), new Integer(0)));
		}
		
		List<ScheduleDetail> schedule = new ArrayList<ScheduleDetail>();
		for(StateChange stateChange: listMessage){
			int hourOfWeek = getHourOfWeek(stateChange);
			
			Integer value = scheduleValues.get(hourOfWeek).getLeft();
			Integer occurences = scheduleValues.get(hourOfWeek).getRight();

			value = value + Integer.valueOf(stateChange.getValues().get(SUPPORTED_VALUE));
			occurences = occurences+1;
			
			scheduleValues.get(hourOfWeek).setLeft(value);
			scheduleValues.get(hourOfWeek).setRight(occurences);
		}
		
		for (int hourOfWeek = 0; hourOfWeek <= 167; hourOfWeek++) {
			Integer value = scheduleValues.get(hourOfWeek).getLeft();
			Integer occurences = scheduleValues.get(hourOfWeek).getRight();
			Integer valueMean = 0;
			
			if (occurences == 0){
				Integer previousSetValue =0;
				Integer nextSetValue=0;
				
				for (int hourOfWeekNext = hourOfWeek+1; hourOfWeekNext <= 167; hourOfWeekNext++) {
					Integer nextValue = scheduleValues.get(hourOfWeekNext).getLeft();
					Integer nextOccurences = scheduleValues.get(hourOfWeekNext).getRight();
					if (nextOccurences != 0){
						nextSetValue = nextValue/nextOccurences;
						break;
					}
				}
				for (int hourOfWeekPrevious = hourOfWeek-1; hourOfWeekPrevious >= 0; hourOfWeekPrevious--) {
					Integer previousValue = scheduleValues.get(hourOfWeekPrevious).getLeft();
					Integer previousOccurences = scheduleValues.get(hourOfWeekPrevious).getRight();
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
			
			ScheduleDetail detail = new ScheduleDetail(hourOfWeek%24,hourOfWeek/7);
			detail.setState(new Thermostat(String.valueOf(valueMean), "0", "0", "0"));
			schedule.add(detail);
		}
		return schedule;
	}
		

}
