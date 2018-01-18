package server;
public class Connection 
{
	private final long id;
	private final String content;
	
	public Connection(long id, String content)
	{
		this.id = id;
		this.content = content;
	}
	
	public long getId()
	{
		return id;
	}
	
	public String getContent()
	{
		return content;
	}
}
