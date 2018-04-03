package application.model.messages;

import com.google.gson.annotations.Expose;

public class AlertRequest extends Message {

	@Expose
	private String username;
	@Expose
	private String description;
	@Expose
	private boolean isRead;
	
	public AlertRequest(String token, String username, String description, boolean isRead)
	{
		super(token);
		this.username = username;
		this.description = description;
		this.isRead = isRead;
	}
	
	public String getUsername() 
	{
		return username;
	}

	public void setUsername(String username) 
	{
		this.username = username;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public boolean getIsRead() {
		return isRead;
	}

	public void setIsRead(boolean isRead) {
		this.isRead = isRead;
	}
}
