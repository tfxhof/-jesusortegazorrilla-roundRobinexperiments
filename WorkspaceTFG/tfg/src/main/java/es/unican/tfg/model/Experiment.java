package es.unican.tfg.model;

import java.util.List;

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
	private String description;
	
	//TODO: should this be 'creator_fk'?
	@OneToOne
	@JoinColumn(name="research_center_fk")
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
	 * @param description
	 * @param material
	 * @param creator
	 * @param participants
	 * @param measures
	 */
	public Experiment(String description, List<Sample> material, 
			ResearchCenter creator, List<ResearchCenter> participants,
			List<Measure> measures) {
		super();
		this.description = description;
		this.material = material;
		this.creator = creator;
		this.participants = participants;
		this.measures = measures;
	}

	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
