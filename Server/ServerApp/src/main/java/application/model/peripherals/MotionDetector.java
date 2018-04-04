package application.model.peripherals;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("MotionDetector")
public class MotionDetector extends State {
	private Boolean detectedMotion;

	public MotionDetector() {
		super();
	}
	
	public void setStateValue(String field, String value) {
		if (field.equals("detectedMotion")){
			detectedMotion = Boolean.valueOf(value);
		}
	}
	
	public Map<String, String> getStateValues() {
		Map<String,String> values = new HashMap<>();
		values.put("detectedMotion", Boolean.toString(detectedMotion));
		return values;
	}

	public MotionDetector(Boolean detectedMotion) {
		super();
		this.detectedMotion = detectedMotion;
	}

	public Boolean getDetectedMotion() {
		return detectedMotion;
	}

	public void setDetectedMotion(Boolean detectedMotion) {
		this.detectedMotion = detectedMotion;
	}

}
