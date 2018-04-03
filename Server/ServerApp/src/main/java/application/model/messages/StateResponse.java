package application.model.messages;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("StateResponse")
public class StateResponse extends Message {

	public StateResponse() {}
	
	public StateResponse(Integer id, String token) {
		super(id,token);
	}
	
	public StateResponse(String token) {
		super(token);
	}
}
