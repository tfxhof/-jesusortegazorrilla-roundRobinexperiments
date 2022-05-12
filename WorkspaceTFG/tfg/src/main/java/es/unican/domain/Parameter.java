package es.unican.domain;

/**
 * Parameter that are going to be used during a test
 * @author Jesus
 *
 */
public class Parameter {

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
