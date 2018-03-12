package application.model.peripherals;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Light")
public class Light extends State {
	private Boolean currentStateOn;
	private Boolean desiredStateOn;
	private int currentBrightness;
	private int desiredBrightness;

	public Light() {
		super();
	}

	public Light(Boolean currentStateOn, Boolean desiredStateOn, int currentBrightness, int desiredBrightness) {
		super();
		this.currentStateOn = currentStateOn;
		this.desiredStateOn = desiredStateOn;
		this.currentBrightness = currentBrightness;
		this.desiredBrightness = desiredBrightness;
	}

	public Boolean getCurrentStateOn() {
		return currentStateOn;
	}

	public void setCurrentStateOn(Boolean currentStateOn) {
		this.currentStateOn = currentStateOn;
	}

	public Boolean getDesiredStateOn() {
		return desiredStateOn;
	}

	public void setDesiredStateOn(Boolean desiredStateOn) {
		this.desiredStateOn = desiredStateOn;
	}

	public int getCurrentBrightness() {
		return currentBrightness;
	}

	public void setCurrentBrightness(int currentBrightness) {
		this.currentBrightness = currentBrightness;
	}

	public int getDesiredBrightness() {
		return desiredBrightness;
	}

	public void setDesiredBrightness(int desiredBrightness) {
		this.desiredBrightness = desiredBrightness;
	}

}
