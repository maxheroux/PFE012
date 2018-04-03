package application.model.messages;

import com.google.gson.annotations.Expose;

public class AlertRequest extends Message {

	@Expose
	private int domicileId;
	@Expose
	private String description;
	@Expose
	private boolean isRead;
	
	public AlertRequest(int domicileId, String description, boolean isRead)
	{
		this.domicileId = domicileId;
		this.description = description;
		this.isRead = isRead;
	}
	
	public int getDomicileId() {
		return domicileId;
	}

	public void setDomicileId(int domicileId) {
		this.domicileId = domicileId;
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
