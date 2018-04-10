package application.utilities;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import application.model.messages.StateChange;
import application.model.peripherals.ScheduleDetail;
import application.repositories.StateChangeRepository;

public class AutomaticScheduler {

	@Autowired
	private StateChangeRepository stateChangeRepository;

	public List<ScheduleDetail> getAutomaticHoraire(List<Integer> peripheralIds) {
		List<ScheduleDetail> details = new ArrayList<>();
		
		for (Integer id: peripheralIds) {
			ArrayList<Integer> idList= new ArrayList<>();
			idList.add(id);
			details.addAll(getScheduleDetailsFromStateChanges(stateChangeRepository.findAll(idList)));
			
		}
		Iterable<StateChange> messages = stateChangeRepository.findAll(peripheralIds);
			

		return details;
	}
	
	private  List<ScheduleDetail> getScheduleDetailsFromStateChanges(Iterable<StateChange> messages){
		
		for (int hourOfDay = 0;hourOfDay<24;hourOfDay++) {
			for (int dayOfWeek = 0;hourOfDay<7;dayOfWeek++) {
				
			}
		}
		
		return new ArrayList<ScheduleDetail>();
	}
}
