package application.model.peripherals;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Lock")
public class Lock extends State {
	private Boolean currentLock;
	private Boolean desiredLock;

	public Lock() {
		super();
	}

	public Lock(Boolean currentLock, Boolean desiredLock) {
		super();
		this.currentLock = currentLock;
		this.desiredLock = desiredLock;
	}

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
