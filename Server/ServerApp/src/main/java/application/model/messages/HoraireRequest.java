package application.model.messages;

import java.util.List;

import com.google.gson.annotations.Expose;

public class HoraireRequest extends Message {

	@Expose
	private List<Integer> peripheralIds;
	@Expose
	private String username;

	public HoraireRequest(List<Integer> peripheralId, String username, String token) {
		super(token);
		this.peripheralIds = peripheralId;
		this.username = username;
	}

	public List<Integer> getPeripheralIds() {
		return peripheralIds;
	}

	public String getUsername() {
		return username;
	}
}
