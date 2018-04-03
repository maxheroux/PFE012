package application.model.peripherals;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.google.gson.annotations.Expose;

@Entity
public class Peripheral {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Expose
	private Integer id;

	@Expose
	private String bluetoothId;
	@Expose
	private String name;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "state_id")
	@Expose(serialize = false)
	private State currentState;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(joinColumns = @JoinColumn(name = "peripheral_id"), inverseJoinColumns = @JoinColumn(name = "schedule_detail_id"))
	@Expose(serialize = false)
	private List<ScheduleDetail> schedules;

	public Peripheral() {
		super();
		schedules = new ArrayList<>();
	}

	public Peripheral(String bluetoothId, String name) {
		this();
		this.bluetoothId = bluetoothId;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public String getBluetoothId() {
		return bluetoothId;
	}

	public void setBluetoothId(String bluetoothId) {
		this.bluetoothId = bluetoothId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public State getCurrentState() {
		return currentState;
	}

	public void setCurrentState(State currentState) {
		this.currentState = currentState;
	}

	public ScheduleDetail getSchedule(int hourOfDay, int dayOfWeek) {
		for (ScheduleDetail detail : schedules) {
			if (detail.getDayOfWeek() == dayOfWeek && detail.getHourOfDay() == hourOfDay)
				return detail;
		}
		return null;
	}

	public List<ScheduleDetail> getSchedules() {
		return schedules;
	}

	public void setSchedule(ScheduleDetail schedule) {
		ScheduleDetail scheduleToSet = new ScheduleDetail(schedule.getHourOfDay(), schedule.getDayOfWeek());
		for (ScheduleDetail detail : schedules) {
			if (detail.getDayOfWeek() == schedule.getDayOfWeek() && detail.getHourOfDay() == schedule.getHourOfDay())
				scheduleToSet = detail;
		}
		scheduleToSet.setState(schedule.getState());
		schedules.add(scheduleToSet);
	}

}
