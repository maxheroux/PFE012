package application.domicile;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

import application.authentication.Client;
import application.peripheral.Peripheral;;

public class Domicile extends Client {
	private String name;
	private String street;
	private int streetNumber;
	private String postalCode;
	private String city;
	private InetAddress addr;
	private List<Peripheral> peripherals;

	public Domicile(int id, String username, String password, String salt, String token, String name, String street,
			int streetNumber, String postalCode, String city, InetAddress addr) {
		super(username, password, salt);
		this.name = name;
		this.street = street;
		this.streetNumber = streetNumber;
		this.postalCode = postalCode;
		this.city = city;
		this.addr = addr;
		peripherals = new ArrayList<>();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(int streetNumber) {
		this.streetNumber = streetNumber;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public InetAddress getAddr() {
		return addr;
	}

	public void setAddr(InetAddress addr) {
		this.addr = addr;
	}
	
	public void addPeripheral(Peripheral peripheral) {
		peripherals.add(peripheral);
	}
	
}
