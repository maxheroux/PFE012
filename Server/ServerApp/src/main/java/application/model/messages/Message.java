package application.model.messages;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;

import com.google.gson.annotations.Expose;

@Entity
@Inheritance
@DiscriminatorColumn(name="type")
public class Message {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Expose
	protected Integer id;
	@Expose
	protected LocalDateTime dateTime;
	@Expose
	protected String token;

	public Message() {
		dateTime = LocalDateTime.now();
	}

	public Message(Integer id, String token) {
		this();
		this.id = id;
		this.token = token;
	}

	public Message(String token) {
		this();
		this.token = token;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
