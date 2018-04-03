package application.model.messages;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import com.google.gson.annotations.Expose;

@Entity
@DiscriminatorValue("StateRequest")
public class StateRequest extends Message {
	
	@Expose
	private int peripheralId;
	@Expose
	private String username;

	public StateRequest() {}
	public StateRequest(int peripheralId, String username, String token) {
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
