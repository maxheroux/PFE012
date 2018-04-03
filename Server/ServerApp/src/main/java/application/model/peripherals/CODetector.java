package application.model.peripherals;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CODetector")
public class CODetector extends State {
	private int level;

	public CODetector() {
		super();
	}

	public CODetector(int level) {
		super();
		this.level = level;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public void setStateValue(String field, String value) {
	}
}
