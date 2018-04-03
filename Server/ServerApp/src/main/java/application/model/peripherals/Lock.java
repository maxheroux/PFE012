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
	
	public void setStateValue(String field, String value) {
		if (field.equals("currentLock")){
			currentLock = Boolean.valueOf(value);
		}
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
