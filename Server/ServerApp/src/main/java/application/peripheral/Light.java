package application.peripheral;

public class Light extends State {
	private Boolean currentStateOn;
	private Boolean desiredStateOn;
	private int currentBrightness;
	private int desiredBrightness;
	
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
