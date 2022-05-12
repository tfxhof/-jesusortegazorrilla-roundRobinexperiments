package es.unican.domain;

/**
 * Center involucrated in an experiment
 * @author Jesus
 *
 */
public class ResearchCenter {

	//TODO: has a name? private String name;
	private String instructions;
	
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
	
	
	
}
