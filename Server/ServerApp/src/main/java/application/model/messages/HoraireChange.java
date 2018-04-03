package application.model.messages;

import java.util.List;

import com.google.gson.annotations.Expose;

public class HoraireChange extends Message {
	@Expose
	private List<Schedule> scheduleList;
	@Expose
	private String username;

	public HoraireChange() {
		super();
		// TODO Auto-generated constructor stub
	}

	public HoraireChange(Integer id, String token,String username,List<Schedule> scheduleList) {
		super(id, token);
		this.scheduleList = scheduleList;
		this.username = username;
	}

	public List<Schedule> getScheduleList() {
		return scheduleList;
	}

	public void setScheduleList(List<Schedule> scheduleList) {
		this.scheduleList = scheduleList;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	

	
}
