package application.model.messages;

import com.google.gson.annotations.Expose;

public class HoraireRequest extends Message {
	
	@Expose
	private int peripheralId;
	@Expose
	private String username;

	public HoraireRequest(int peripheralId, String username, String token) {
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
