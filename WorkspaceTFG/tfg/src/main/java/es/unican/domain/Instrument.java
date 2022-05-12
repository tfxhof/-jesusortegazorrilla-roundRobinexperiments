package es.unican.domain;

/**
 * Instrument that will carry out a test
 * @author Jesus
 *
 */
public class Instrument {

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
