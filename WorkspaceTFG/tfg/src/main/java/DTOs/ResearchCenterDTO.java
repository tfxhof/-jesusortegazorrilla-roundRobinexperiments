package DTOs;

import java.io.Serializable;
import java.util.List;

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

import es.unican.tfg.model.ContactData;
import es.unican.tfg.model.Experiment;
import es.unican.tfg.model.ResearchCenter;


@Entity
@Table(name = "research_center")
public class ResearchCenterDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String instructions;
	private ContactData contactInfo;

	//Empty constructor
	public ResearchCenterDTO () {}
	
	/**
	 * @param instructions
	 * @param contactInfo
	 */
	public ResearchCenterDTO(ResearchCenter r) {
		super();
		this.id = r.getId();
		this.name = r.getName();
		this.instructions = r.getInstructions();
		this.contactInfo = r.getContactInfo();
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

