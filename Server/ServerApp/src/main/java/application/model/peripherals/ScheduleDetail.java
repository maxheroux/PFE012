package application.model.peripherals;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity(name = "ScheduleDetail")
@Table(name = "schedule_detail")
public class ScheduleDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private int hourOfDay;
	private int dayOfWeek;
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "state_id")
	private State state;

	public ScheduleDetail() {
		super();
	}

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
