package es.unican.tfg.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;


/**
 * Center involucrated in an experiment
 * @author Jesus
 *
 */
@Entity
@Table(name = "research_center")
public class ResearchCenter implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique=true) 
	private String name;
	@Column(unique=true) 
	private String email;
	private String instructions;
	@Embedded
	private ContactData contactInfo;
	
	
	@ManyToMany(mappedBy="participants", cascade = { CascadeType.ALL })
	private List<Experiment> experiments;

	//Empty constructor
	public ResearchCenter () {}
	
	/**
	 * @param instructions
	 * @param contactInfo
	 */
	public ResearchCenter(String name, String email, String instructions, ContactData contactInfo) {
		super();
		this.name = name;
		this.email = email;
		this.instructions = instructions;
		this.contactInfo = contactInfo;
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

	public ContactData getContactInfo() {
		return contactInfo;
	}

	public void setContactInfo(ContactData contactInfo) {
		this.contactInfo = contactInfo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Experiment> getExperiments() {
		return experiments;
	}

	public void setExperiments(List<Experiment> experiments) {
		this.experiments = experiments;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
	
	
	
	
	
	
}
