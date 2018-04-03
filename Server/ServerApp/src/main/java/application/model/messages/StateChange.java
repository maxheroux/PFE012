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
	private String valueType;
	@Expose
	@ElementCollection
	@MapKeyColumn(name="name")
	@Column(name="value")
	@CollectionTable(name="statechange_values", joinColumns=@JoinColumn(name="id"))
	private Map<String,String> values;

	public StateChange() {}
	public StateChange(int peripheralId, String username, String valueType, Map<String,String> value, String token) {
		super(token);
		this.peripheralId = peripheralId;
		this.username = username;
		this.valueType = valueType;
		this.values = value;
	}

	public int getPeripheralId() {
		return peripheralId;
	}

	public String getUsername() {
		return username;
	}
}
