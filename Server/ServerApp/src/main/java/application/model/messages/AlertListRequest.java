package application.model.messages;

import com.google.gson.annotations.Expose;

public class AlertListRequest extends Message {

	@Expose
	private String username;
	
	public AlertListRequest() {}
	public AlertListRequest(String username, String token) {
		super(token);
		this.username = username;
	}
	
	public String getUsername() {
		return username;
	}
}
