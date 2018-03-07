package application.peripheral;

public class MotionDetector extends State {
	private Boolean detectedMotion;

	public Boolean getDetectedMotion() {
		return detectedMotion;
	}

	public void setDetectedMotion(Boolean detectedMotion) {
		this.detectedMotion = detectedMotion;
	}
	
}
