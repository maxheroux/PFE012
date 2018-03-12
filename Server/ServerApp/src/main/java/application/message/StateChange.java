package application.message;

import java.util.Map;

public class StateChange extends Message {
	private int peripheralId;
	private String username;
	private String valueType;
	private Map<String,String> value;

	public StateChange(int peripheralId, String username, String valueType, Map<String,String> value, String token) {
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
