package application.model;

import java.time.LocalDateTime;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@DiscriminatorValue("Alert")
public class Alert {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String description;
	private LocalDateTime dateTime;
	private boolean isRead;
	
	public Alert()
	{
		this.dateTime = LocalDateTime.now();
	}
	
	public Alert(String description, boolean isRead)
	{
		this.description = description;
		this.isRead = isRead;
		this.dateTime = LocalDateTime.now();
	}
	
	public String getDescription()
	{
		return description;
	}
	
	public void setDescription(String description)
	{
		this.description = description;
	}
	
	public LocalDateTime getDateTime() 
	{
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) 
	{
		this.dateTime = dateTime;
	}
	
	public boolean getIsRead()
	{
		return isRead;
	}
	
	public void setIsRead(boolean isRead)
	{
		this.isRead = isRead;
	}
}
