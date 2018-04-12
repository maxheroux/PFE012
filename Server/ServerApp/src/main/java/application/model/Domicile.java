package application.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import application.model.peripherals.Peripheral;

@Entity
@DiscriminatorValue("Domicile")
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "licenseKey" }) })
public class Domicile extends Client {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private int licenseKey;
	private String name;
	private String street;
	private int streetNumber;
	private String postalCode;
	private String city;
	private String state;
	private String country;

	@OneToMany(cascade = CascadeType.MERGE, orphanRemoval = true)
	@JoinColumn(name = "domicile_id")
	@Fetch(FetchMode.SELECT)
	private List<User> users = new ArrayList<>();

	@OneToMany(cascade = CascadeType.MERGE, orphanRemoval = true)
	@JoinColumn(name = "domicile_id")
	@Fetch(FetchMode.SELECT)
	private List<Peripheral> peripherals;

	public Domicile() {
		//super();
	}

	public Domicile(int licenseKey, String name, String street, int streetNumber, String postalCode, String city,
			String state, String country, String username, String password, String salt) {
		super(username, password, salt);
		this.licenseKey = licenseKey;
		this.name = name;
		this.street = street;
		this.streetNumber = streetNumber;
		this.postalCode = postalCode;
		this.city = city;
		this.state = state;
		this.country = country;
		this.peripherals = new ArrayList<>();
	}

	public int getLicenseKey() {
		return licenseKey;
	}

	public void setLicenseKey(int licenseKey) {
		this.licenseKey = licenseKey;
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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public void addUser(User user) {
		this.users.add(user);
	}

	public void removeUser(User user) {
		this.users.remove(user);
	}

	public void addPeripheral(Peripheral peripheral) {
		peripherals.add(peripheral);
	}

	public void removePeripheral(Peripheral peripheral) {
		peripherals.remove(peripheral);
	}

	public List<Peripheral> getPeripherals() {
		return peripherals;
	}

	
}
