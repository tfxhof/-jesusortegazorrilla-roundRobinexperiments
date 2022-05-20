package es.unican.tfg.model;

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
 * @author jesus
 *
 */
@Entity
public class Experiment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(unique=true) 
	private String name;
	private String description;
	
	@OneToOne
	@JoinColumn(name="creator_center_fk")
	private ResearchCenter creator;
	
	@OneToMany
	@JoinColumn(name="experiment_fk")
	private List<Sample> material;

	@OneToMany
	@JoinColumn(name="experiment_fk")
	private List<ResearchCenter> participants;
	
	@OneToMany
	@JoinColumn(name="experiment_fk")
	private List<Measure> measures;

	//Empty constructor
	public Experiment() {}
	
	
	/**
	 * @param name
	 * @param description
	 * @param creator
	 * @param material
	 * @param participants
	 * @param measures
	 */
	public Experiment(String name, String description, ResearchCenter creator, List<Sample> material,
			List<ResearchCenter> participants, List<Measure> measures) {
		super();
		this.name = name;
		this.description = description;
		this.creator = creator;
		this.material = material;
		this.participants = participants;
		this.measures = measures;
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Sample> getMaterial() {
		return material;
	}

	public void setMaterial(List<Sample> material) {
		this.material = material;
	}

	public ResearchCenter getCreator() {
		return creator;
	}

	public void setCreator(ResearchCenter creator) {
		this.creator = creator;
	}

	public List<ResearchCenter> getParticipants() {
		return participants;
	}

	public void setParticipants(List<ResearchCenter> participants) {
		this.participants = participants;
	}

	public List<Measure> getMeasures() {
		return measures;
	}

	public void setMeasures(List<Measure> measures) {
		this.measures = measures;
	}
	
	
	
	
}
