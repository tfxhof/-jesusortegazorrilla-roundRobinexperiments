package es.unican.tfg.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Parameter that are going to be used during a test
 * @author Jesus
 *
 */
@Entity
public class Parameter {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String magnitude;
	private double value;
	
	
	//Empty constructor
	public Parameter () {}
	
	/**
	 * @param magnitude
	 * @param value
	 */
	public Parameter(String magnitude, double value) {
		super();
		this.magnitude = magnitude;
		this.value = value;
	}
	
	
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getMagnitude() {
		return magnitude;
	}
	public void setMagnitude(String magnitude) {
		this.magnitude = magnitude;
	}
	public double getValue() {
		return value;
	}
	public void setValue(double value) {
		this.value = value;
	}
	
	
}
