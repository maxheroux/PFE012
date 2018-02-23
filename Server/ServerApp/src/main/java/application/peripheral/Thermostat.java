package application.peripheral;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@DiscriminatorValue("Thermostat")
public class Thermostat extends State
{

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String desiredTemperature;
	private String currentTemperature;
	private String brigthness;
	private String currentHumidity;

	//private String type;
		
	public Thermostat() { }
	
	public Thermostat(Integer id)
	{
		this.id = id;
	}
	
	public Thermostat(int id, String desiredTemperature, String currentTemperature, String brigthness, String currentHumidity)
	{
		 this.id = id;              
		 this.desiredTemperature = desiredTemperature;
		 this.currentTemperature=currentTemperature;
		 this.brigthness = brigthness;
		 this.currentHumidity=currentHumidity;
		 //this.type = type;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDesiredTemperature() {
		return desiredTemperature;
	}

	public void setDesiredTemperature(String desiredTemperature) {
		this.desiredTemperature = desiredTemperature;
	}

	public String getCurrentTemperature() {
		return currentTemperature;
	}

	public void setCurrentTemperature(String currentTemperature) {
		this.currentTemperature = currentTemperature;
	}

	public String getBrigthness() {
		return brigthness;
	}

	public void setBrigthness(String brigthness) {
		this.brigthness = brigthness;
	}

	public String getCurrentHumidity() {
		return currentHumidity;
	}

	public void setCurrentHumidity(String currentHumidity) {
		this.currentHumidity = currentHumidity;
	}

	
	
	
}
