package application.model.messages;

import com.google.gson.annotations.Expose;

public class AlertRequest extends Message {

	@Expose
	private int domicileId;
	@Expose
	private String type;
	@Expose
	private boolean isRead;
	
	public AlertRequest(int domicileId, String token, String type)
	{
		super(token);
		this.domicileId = domicileId;
		this.type = type;
		this.isRead = false;
	}
	
	public int getDomicileId() {
		return domicileId;
	}

	public void setDomicileId(int domicileId) {
		this.domicileId = domicileId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public boolean getIsRead() {
		return isRead;
	}

	public void setIsRead(boolean isRead) {
		this.isRead = isRead;
	}
}
