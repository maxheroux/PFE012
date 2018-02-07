package application.authentication;
public class User 
{
	private final String username;
	private final String password;
	private final String salt;
	private String publicIp;
	private int port;
	
	public User(String username, String password, String salt ,String publicIp, int port)
	{
		this.username = username;
		this.password = password;
		this.salt = salt;
		this.setPublicIp(publicIp);
		this.setPort(port);
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
