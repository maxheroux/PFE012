package application.peripheral;

public class ScheduleDetail {
	private int hourOfDay;
	private int dayOfWeek;
	private State state;
	
	public ScheduleDetail(int hourOfDay, int dayOfWeek) {
		super();
		this.hourOfDay = hourOfDay;
		this.dayOfWeek = dayOfWeek;
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

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}
	
	
}
