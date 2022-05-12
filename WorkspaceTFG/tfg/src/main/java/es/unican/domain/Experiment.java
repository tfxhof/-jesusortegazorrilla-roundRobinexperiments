package es.unican.domain;

import java.util.List;

public class Experiment {

	private String description;
	
	private Sample material;
	
	private ResearchCenter creator;
	
	private List<ResearchCenter> participants;
	
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
	public Experiment(String description, Sample material, ResearchCenter creator, List<ResearchCenter> participants,
			List<Measure> measures) {
		super();
		this.description = description;
		this.material = material;
		this.creator = creator;
		this.participants = participants;
		this.measures = measures;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Sample getMaterial() {
		return material;
	}

	public void setMaterial(Sample material) {
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
