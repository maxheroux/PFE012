package application.model.messages;

import com.google.gson.annotations.Expose;

import java.util.Map;

public class StateChange extends Message {
	@Expose
	private int peripheralId;
	@Expose
	private String username;
	@Expose
	private Map<String,String> value;

	public StateChange(int peripheralId, String username,  Map<String,String> value, String token) {
		super(token);
		this.peripheralId = peripheralId;
		this.username = username;
		this.value = value;
	}

	public int getPeripheralId() {
		return peripheralId;
	}

	public String getUsername() {
		return username;
	}

	public Map<String, String> getValue() {
		return value;
	}

	public void setValue(Map<String, String> value) {
		this.value = value;
	}

	public void setPeripheralId(int peripheralId) {
		this.peripheralId = peripheralId;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
