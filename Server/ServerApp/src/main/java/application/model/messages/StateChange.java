package application.model.messages;

import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyColumn;

import com.google.gson.annotations.Expose;

@Entity
@DiscriminatorValue("StateChange")
public class StateChange extends Message {
	@Expose
	private int peripheralId;
	@Expose
	private String username;
	@Expose
	@ElementCollection
	@MapKeyColumn(name="name")
	@Column(name="value")
	@CollectionTable(name="statechange_values", joinColumns=@JoinColumn(name="id"))
	private Map<String,String> value;

	public StateChange() {}
	public StateChange(int peripheralId, String username, Map<String,String> values, String token) {
		super(token);
		this.peripheralId = peripheralId;
		this.username = username;
		this.value = values;
	}

	public int getPeripheralId() {
		return peripheralId;
	}

	public String getUsername() {
		return username;
	}

	public Map<String, String> getValues() {
		return value;
	}

	public void setValues(Map<String, String> values) {
		this.value = values;
	}

	public void setPeripheralId(int peripheralId) {
		this.peripheralId = peripheralId;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
