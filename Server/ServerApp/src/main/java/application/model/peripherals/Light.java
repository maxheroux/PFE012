package application.model.peripherals;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Light")
public class Light extends State {
	private Boolean currentStateOn;
	private int currentBrightness;

	public Light() {
		super();
	}

	public Light(Boolean currentStateOn, int currentBrightness) {
		super();
		this.currentStateOn = currentStateOn;
		this.currentBrightness = currentBrightness;
	}

	public Boolean getCurrentStateOn() {
		return currentStateOn;
	}

	public void setCurrentStateOn(Boolean currentStateOn) {
		this.currentStateOn = currentStateOn;
	}

	public int getCurrentBrightness() {
		return currentBrightness;
	}

	public void setCurrentBrightness(int currentBrightness) {
		this.currentBrightness = currentBrightness;
	}

}
