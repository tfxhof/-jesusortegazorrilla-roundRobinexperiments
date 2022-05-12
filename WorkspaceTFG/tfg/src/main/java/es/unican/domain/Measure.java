package es.unican.domain;

/**
 * Instructions about how to carry out a test which could take place in different centers
 * @author Jesus
 *
 */
public class Measure {

	private String instructions;
	
	private Sample sample;

	
	//Empty constructor
	public Measure() {}
	
	/**
	 * @param instructions
	 * @param sample
	 */
	public Measure(String instructions, Sample sample) {
		super();
		this.instructions = instructions;
		this.sample = sample;
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
	
	
}
