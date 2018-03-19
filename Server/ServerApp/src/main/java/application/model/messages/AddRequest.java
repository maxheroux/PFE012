package application.model.messages;

import com.google.gson.annotations.Expose;

public class AddRequest extends Message {
	@Expose
	private String username;
	@Expose
	private String type;
	@Expose
	private String bluetoothId;
	@Expose
	private String name;

	public AddRequest(String username, String type, String bluetoothId, String token, String name) {
		super(token);
		this.username = username;
		this.type = type;
		this.bluetoothId = bluetoothId;
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getBluetoothId() {
		return bluetoothId;
	}

	public void setBluetoothId(String bluetoothId) {
		this.bluetoothId = bluetoothId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
