package application.peripheral;

public class Lock extends State {
	private Boolean currentLock;
	private Boolean desiredLock;
	
	public Boolean getCurrentLock() {
		return currentLock;
	}
	public void setCurrentLock(Boolean currentLock) {
		this.currentLock = currentLock;
	}
	public Boolean getDesiredLock() {
		return desiredLock;
	}
	public void setDesiredLock(Boolean desiredLock) {
		this.desiredLock = desiredLock;
	}
	
	
}
