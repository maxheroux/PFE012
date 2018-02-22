package application.peripheral;

import java.util.ArrayList;
import java.util.List;

public abstract class Peripheral {
	private int id;
	private String name;
	private String blueToothID;
	private State currentState;
	private ScheduleDetail[][] schedule = new ScheduleDetail[7][24];;
	
	
	public Peripheral(int id, String name, String blueToothID) {
		super();
		this.id = id;
		this.name = name;
		this.blueToothID = blueToothID;

		
		for(int i =0;i<=6;i++) {
			for(int k =0;k<=23;k++) {
				schedule[i][k] = new ScheduleDetail(k, i);
			}
		}
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBlueToothID() {
		return blueToothID;
	}
	public void setBlueToothID(String blueToothID) {
		this.blueToothID = blueToothID;
	}
	public State getState() {
		return currentState;
	}
	public void setState(State state) {
		this.currentState = state;
	}
	
	public State getScheduleState(int hourOfDay, int dayOfWeek) {
		return schedule[dayOfWeek][hourOfDay].getState();
	}
	
	public void setScheduleState(int hourOfDay, int dayOfWeek, State state) {
		schedule[dayOfWeek][hourOfDay].setState(state);
	}
}
