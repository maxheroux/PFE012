package application.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@DiscriminatorValue("User")
@Table(uniqueConstraints= {@UniqueConstraint(columnNames = {"username"})})
public class User extends Client
{	
	@ElementCollection
	@CollectionTable(name="Rfid", joinColumns=@JoinColumn(name="user_id"))
	@Column(name="rfid")
	private List<String> rfids = new ArrayList<String>();
	
	public User() {}
	
	public User(String username, String password, String salt)
	{
		super(username, password, salt);
	}

	public List<String> getRfids() {
		return rfids;
	}

	public void setRfids(List<String> rfids) {
		this.rfids = rfids;
	}
}
