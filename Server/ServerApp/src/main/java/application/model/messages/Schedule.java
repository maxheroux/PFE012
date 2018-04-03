package application.model.messages;

import java.util.Map;

import com.google.gson.annotations.Expose;

public class Schedule {
	@Expose
	private int idPeripheral;
	@Expose
	private int hourOfDay;
	@Expose
	private int dayOfWeek;
	@Expose
	private Map<String, String> value;
	public Schedule(int idPeripheriral, int hourOfDay, int dayOfWeek, Map<String, String> values) {
		super();
		this.idPeripheral = idPeripheriral;
		this.hourOfDay = hourOfDay;
		this.dayOfWeek = dayOfWeek;
		this.value = values;
	}
	public int getIdPeripheriral() {
		return idPeripheral;
	}
	public void setIdPeripheriral(int idPeripheriral) {
		this.idPeripheral = idPeripheriral;
	}
	public int getHourOfDay() {
		return hourOfDay;
	}
	public void setHourOfDay(int hourOfDay) {
		this.hourOfDay = hourOfDay;
	}
	public int getDayOfWeek() {
		return dayOfWeek;
	}
	public void setDayOfWeek(int dayOfWeek) {
		this.dayOfWeek = dayOfWeek;
	}
	public Map<String, String> getValues() {
		return value;
	}
	public void setValues(Map<String, String> value) {
		this.value = value;
	}
	
	
}


