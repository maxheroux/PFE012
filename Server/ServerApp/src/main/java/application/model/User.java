package application.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@DiscriminatorValue("User")
@Table(uniqueConstraints= {@UniqueConstraint(columnNames = {"username"})})
public class User extends Client
{	
	public User() {}
	
	public User(String username, String password, String salt)
	{
		super(username, password, salt);
	}
}
