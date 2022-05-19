package es.unican.tfg.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/**
 * Instructions about how to carry out a test which could take place in different centers
 * @author Jesus
 *
 */
@Entity
public class Measure {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String instructions;
	
	@OneToOne
	@JoinColumn(name="sample_fk")
	private Sample sample;

	
	//Empty constructor
	public Measure() {}
	
	/**
	 * @param instructions
	 * @param sample
	 */
	public Measure(String instructions, Sample sample) {
		super();
		this.instructions = instructions;
		this.sample = sample;
	}
	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public Sample getSample() {
		return sample;
	}

	public void setSample(Sample sample) {
		this.sample = sample;
	}
	
	
}
