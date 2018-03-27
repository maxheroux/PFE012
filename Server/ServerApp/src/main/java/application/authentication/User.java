package application.authentication;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import application.domicile.Domicile;

@Entity
@DiscriminatorValue("User")
@Table(uniqueConstraints= {@UniqueConstraint(columnNames = {"username"})})
public class User extends Client
{
	
	private String publicIp;
	private int port;
	
	public User() {}
	
	public User(String username, String password, String salt, String publicIp, int port)
	{
		super(username, password, salt);
		this.setPublicIp(publicIp);
		this.setPort(port);
	}
	
	public String getPublicIp() 
	{
		return publicIp;
	}

	public void setPublicIp(String publicIp) 
	{
		this.publicIp = publicIp;
	}

	public int getPort() 
	{
		return port;
	}

	public void setPort(int port) 
	{
		this.port = port;
	}
	
}