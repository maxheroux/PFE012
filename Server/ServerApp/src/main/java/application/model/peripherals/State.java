package application.model.peripherals;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;

@Entity
@Inheritance
@DiscriminatorColumn(name="type")
public abstract class State {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	public State() {
	}

	public State(Integer id) {
		this.id = id;
	}
}
