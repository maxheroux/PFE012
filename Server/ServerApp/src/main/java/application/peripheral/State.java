package application.peripheral;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public abstract class State {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
public State() { }
	
	public State(Integer id)
	{
		this.id = id;
	}	
}
