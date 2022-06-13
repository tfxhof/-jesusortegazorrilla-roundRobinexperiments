package DTOs;

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

import es.unican.tfg.model.Measure;
import es.unican.tfg.model.Sample;

/**
 * Instructions about how to carry out a test which could take place in different centers
 * @author Jesus
 *
 */

public class MeasureDTO {

	private Long id;
	private String name;
	private String instructions;
	private Sample sample;
	

	//Empty constructor
	public MeasureDTO() {}
	
	/**
	 * @param instructions
	 * @param sample
	 */
	public MeasureDTO(Measure m) {
		super();
		this.id = m.getId();
		this.name = m.getName();
		this.instructions = m.getInstructions();
		this.sample = m.getSample();
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
	
}
