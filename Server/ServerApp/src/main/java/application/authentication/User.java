package application.authentication;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints= {@UniqueConstraint(columnNames = {"username"})})
public class User 
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private String username;
	private String password;
	private String salt;
	private String publicIp;
	private int port;
	
	public User() { }
	
	public User(Integer id)
	{
		this.id = id;
	}
	
	public User(String username, String password, String salt, String publicIp, int port)
	{
		this.username = username;
		this.password = password;
		this.salt = salt;
		this.setPublicIp(publicIp);
		this.setPort(port);
	}
	
	public Integer getId()
	{
		return id;
	}
	
	public void setId(Integer id)
	{
		this.id = id;
	}
	
	public String getUsername()
	{
		return username;
	}
	
	public String getPassword()
	{
		return password;
	}
	
	public String getSalt()
	{
		return salt;
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
