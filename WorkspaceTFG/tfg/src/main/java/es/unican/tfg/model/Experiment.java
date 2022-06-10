package es.unican.tfg.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Cascade;

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
	
	@Enumerated(EnumType.ORDINAL)
	private ExperimentStatus status;
	
	@OneToOne
	@JoinColumn(name="creator_center_fk")
	//@Cascade(value=CascadeType.ALL)
	private ResearchCenter creator;
	
	@OneToMany
	@JoinColumn(name="experiment_fk")
	private List<Sample> samples;

	
	@ManyToMany(cascade = {CascadeType.ALL})
	@JoinTable(name="experiment_research_center", 
	joinColumns=@JoinColumn(name="experiment_fk"), 
	inverseJoinColumns=@JoinColumn(name="research_center_fk"))
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
		this.samples = material;
		this.participants = participants;
		this.measures = measures;
		this.status = ExperimentStatus.CREATED;
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

	public List<Sample> getSamples() {
		return samples;
	}

	public void setSamples(List<Sample> material) {
		this.samples = material;
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


	public ExperimentStatus getStatus() {
		return status;
	}


	public void setStatus(ExperimentStatus status) {
		this.status = status;
	}
	
	
	
	
	
	
}
