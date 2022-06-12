package es.unican.tfg.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
	private Long id;
	@Column(unique=true) 
	private String name;
	private String instructions;
	
	@OneToOne
	@JoinColumn(name="sample_fk")
	private Sample sample;
	
	@OneToMany
	@JoinColumn(name="measure_fk")
	private List<Measurement> measurements;

	
	//Empty constructor
	public Measure() {}
	
	/**
	 * @param instructions
	 * @param sample
	 */
	public Measure(String name, String instructions, Sample sample) {
		super();
		this.name = name;
		this.instructions = instructions;
		this.sample = sample;
		this.measurements = new ArrayList<Measurement>();
	}
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Measurement> getMeasurements() {
		return measurements;
	}

	public void setMeasurements(List<Measurement> measurements) {
		this.measurements = measurements;
	}
	
	
	
	
	
	
}
