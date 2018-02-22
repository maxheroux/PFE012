package application.peripheral;

public class Thermostat extends State {
	private int currentHumidity;
	private int currentTemperature;
	private int desiredTemperature;
	private int currentBrightness;
	private int desiredBrightness;
	
	public int getCurrentHumidity() {
		return currentHumidity;
	}
	public void setCurrentHumidity(int currentHumidity) {
		this.currentHumidity = currentHumidity;
	}
	public int getCurrentTemperature() {
		return currentTemperature;
	}
	public void setCurrentTemperature(int currentTemperature) {
		this.currentTemperature = currentTemperature;
	}
	public int getDesiredTemperature() {
		return desiredTemperature;
	}
	public void setDesiredTemperature(int desiredTemperature) {
		this.desiredTemperature = desiredTemperature;
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
