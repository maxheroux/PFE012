package application.model.peripherals;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("RFIDReader")
public class RFIDReader extends State {
	private String readRFID;

	public RFIDReader() {
		super();
		this.readRFID = "";
	}
	
	public void setStateValue(String field, String value) {
		readRFID = value;
	}
	
	public Map<String, String> getStateValues() {
		Map<String,String> values = new HashMap<>();
		values.put("readRFID", readRFID);
		return values;
	}

	public RFIDReader(String readRFID) {
		super();
		this.readRFID = readRFID;
	}

	public String getReadRFID() {
		return readRFID;
	}

	public void setReadRFID(String readRFID) {
		this.readRFID = readRFID;
	}

}
