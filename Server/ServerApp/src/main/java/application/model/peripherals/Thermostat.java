package application.model.peripherals;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Thermostat")
public class Thermostat extends State {
	private String desiredTemperature;
	private String currentTemperature;
	private String brigthness;
	private String currentHumidity;

	public Thermostat() {
		this.desiredTemperature = "0";
		this.currentTemperature = "0";
		this.brigthness = "0";
		this.currentHumidity = "0";
	}

	public Thermostat(String desiredTemperature, String currentTemperature, String brigthness, String currentHumidity) {
		this.desiredTemperature = desiredTemperature;
		this.currentTemperature = currentTemperature;
		this.brigthness = brigthness;
		this.currentHumidity = currentHumidity;
	}

	public String getDesiredTemperature() {
		return desiredTemperature;
	}

	public void setDesiredTemperature(String desiredTemperature) {
		this.desiredTemperature = desiredTemperature;
	}

	public String getCurrentTemperature() {
		return currentTemperature;
	}

	public void setCurrentTemperature(String currentTemperature) {
		this.currentTemperature = currentTemperature;
	}

	public String getBrigthness() {
		return brigthness;
	}

	public void setBrigthness(String brigthness) {
		this.brigthness = brigthness;
	}

	public String getCurrentHumidity() {
		return currentHumidity;
	}

	public void setCurrentHumidity(String currentHumidity) {
		this.currentHumidity = currentHumidity;
	}

}
