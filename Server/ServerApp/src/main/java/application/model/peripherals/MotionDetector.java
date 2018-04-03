package application.model.peripherals;

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
