package application.model.peripherals;

import java.util.HashMap;
import java.util.Map;

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
	
	public void setStateValue(String field, String value) {
		if (field.equals("currentStateOn")){
			currentStateOn = Boolean.valueOf(value);
		}
		if (field.equals("currentBrightness")){
			currentBrightness = Integer.valueOf(value);
		}
	}
	
	public Map<String, String> getStateValues() {
		Map<String,String> values = new HashMap<>();
		values.put("currentBrightness", Integer.toString(currentBrightness));
		values.put("currentStateOn", Boolean.toString(currentStateOn));
		return values;
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
