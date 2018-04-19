package application.model.messages;

import java.util.List;

import com.google.gson.annotations.Expose;

public class AlertRemoveRequest extends Message {

	@Expose
	private List<Integer> alertIds;
	@Expose
	private String username;
	
	public AlertRemoveRequest(List<Integer> alertIds, String username, String token)
	{
		super(token);
		this.alertIds = alertIds;
		this.username = username;
	}
	
	public List<Integer> getAlertIds() 
	{
		return alertIds;
	}
	
	public String getUsername() 
	{
		return username;
	}
}
