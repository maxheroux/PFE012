package application.message;

public class StateRequest extends Message {
	private int peripheralId;
	private String username;
	
	public StateRequest(int peripheralId, String username,String token) {
		super(token);
		this.peripheralId = peripheralId;
		this.username = username;
	}
	public int getPeripheralId() {
		return peripheralId;
	}
	public String getUsername() {
		return username;
	}
}
