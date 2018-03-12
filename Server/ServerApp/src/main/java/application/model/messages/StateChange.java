package application.model.messages;

import com.google.gson.annotations.Expose;

public class StateChange extends Message {
	@Expose
	private int peripheralId;
	@Expose
	private String username;
	@Expose
	private String valueType;
	@Expose
	private int value;

	public StateChange(int peripheralId, String username, String valueType, int value, String token) {
		super(token);
		this.peripheralId = peripheralId;
		this.username = username;
		this.valueType = valueType;
		this.value = value;
	}

	public int getPeripheralId() {
		return peripheralId;
	}

	public String getUsername() {
		return username;
	}
}
