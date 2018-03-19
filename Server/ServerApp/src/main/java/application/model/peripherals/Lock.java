package application.model.peripherals;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Lock")
public class Lock extends State {
	private Boolean currentLock;

	public Lock() {
		super();
	}

	public Lock(Boolean currentLock) {
		super();
		this.currentLock = currentLock;
	}

	public Boolean getCurrentLock() {
		return currentLock;
	}

	public void setCurrentLock(Boolean currentLock) {
		this.currentLock = currentLock;
	}

}
