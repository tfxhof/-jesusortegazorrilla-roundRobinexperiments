package es.unican.tfg.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Instrument that will carry out a test
 * @author Jesus
 *
 */
@Entity
public class Instrument {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String brand;
	private String model;
	
	//Empty constructor
	public Instrument() {}
	
	/**
	 * @param name
	 * @param brand
	 * @param model
	 */
	public Instrument(String name, String brand, String model) {
		super();
		this.name = name;
		this.brand = brand;
		this.model = model;
	}
	
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	
	
	
	
}
