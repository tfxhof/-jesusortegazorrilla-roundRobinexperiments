package es.unican.tfg.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Contact data to contact with a center
 * @author Jesus
 *
 */


@Embeddable
public class ContactData implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
	private String country;
	private String city;
	private String address;
	private String dutyManagerName;
	
	//Empty constructor
	
	public ContactData () {}
	
	/**
	 * @param country
	 * @param city
	 * @param address
	 * @param dutyManagerName
	 */
	public ContactData(String country, String city, String address, String dutyManagerName) {
		super();
		this.country = country;
		this.city = city;
		this.address = address;
		this.dutyManagerName = dutyManagerName;
	}
	
	
	

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDutyManagerName() {
		return dutyManagerName;
	}

	public void setDutyManagerName(String dutyManagerName) {
		this.dutyManagerName = dutyManagerName;
	}
	
	
	
}
