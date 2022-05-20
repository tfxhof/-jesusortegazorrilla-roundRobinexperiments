package es.unican.tfg.model;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Center involucrated in an experiment
 * @author Jesus
 *
 */
@Entity
@Table(name = "research_center")
public class ResearchCenter {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String instructions;
	@Embedded
	private ContactData contactInfo;

	//Empty constructor
	public ResearchCenter () {}
	
	/**
	 * @param instructions
	 * @param contactInfo
	 */
	public ResearchCenter(String instructions, ContactData contactInfo) {
		super();
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
	
	
	
	
}
