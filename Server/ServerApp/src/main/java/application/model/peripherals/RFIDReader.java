package application.model.peripherals;

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
