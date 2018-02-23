package application.peripheral;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Inheritance
@DiscriminatorColumn(name="type")
public class Peripheral 
{

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private String bluetoothId;
	private String name;
	//private State currentState;
	//private ScheduleDetail[][] schedule = new ScheduleDetail[7][24];
		
	public Peripheral() { }
	
	public Peripheral(Integer id)
	{
		this.id = id;
	}
	
	public Peripheral(int id, String bluetoothId, String name)
	{
		 this.id = id;              
		 this.bluetoothId = bluetoothId;
		 this.name=name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBluetoothId() {
		return bluetoothId;
	}

	public void setBluetoothId(String bluetoothId) {
		this.bluetoothId = bluetoothId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	/*public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}*/
	
	
	
}
