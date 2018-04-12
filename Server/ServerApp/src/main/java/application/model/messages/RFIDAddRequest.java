package application.model.messages;

import com.google.gson.annotations.Expose;

public class RFIDAddRequest extends Message {

	@Expose
	private String username;
	@Expose
	private String tagId;
	
	public RFIDAddRequest(String token, String username, String tagId)
	{
		super(token);
		this.username = username;
		this.tagId = tagId;
	}
	
	public String getUsername()
	{
		return username;
	}

	public String getTagId() {
		return tagId;
	}

	public void setTagId(String tagId) {
		this.tagId = tagId;
	}
}
