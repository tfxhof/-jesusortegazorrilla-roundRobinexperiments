package es.unican.domain;

import java.util.List;

/**
 * measurement of a measure in a specific center
 * @author Jesus
 *
 */
public class Measurement {

	private ResearchCenter executingCenter;
	
	private Measure measure;
	
	private Instrument instrument;
	
	private List<Parameter> parameters;
	
	private List<Result> results;
	
	private List<Sample> samples;

	//Empty constructor
	public Measurement() {}
	
	/**
	 * @param executingCenter
	 * @param measure
	 * @param instrument
	 * @param parameters
	 * @param results
	 */
	public Measurement(ResearchCenter executingCenter, Measure measure, Instrument instrument,
			List<Parameter> parameters, List<Result> results, List<Sample> samples) {
		super();
		this.executingCenter = executingCenter;
		this.measure = measure;
		this.instrument = instrument;
		this.parameters = parameters;
		this.results = results;
		this.samples = samples;
	}

	
	
	public ResearchCenter getExecutingCenter() {
		return executingCenter;
	}

	public void setExecutingCenter(ResearchCenter executingCenter) {
		this.executingCenter = executingCenter;
	}

	public Measure getMeasure() {
		return measure;
	}

	public void setMeasure(Measure measure) {
		this.measure = measure;
	}

	public Instrument getInstrument() {
		return instrument;
	}

	public void setInstrument(Instrument instrument) {
		this.instrument = instrument;
	}

	public List<Parameter> getParameters() {
		return parameters;
	}

	public void setParameters(List<Parameter> parameters) {
		this.parameters = parameters;
	}

	public List<Result> getResults() {
		return results;
	}

	public void setResults(List<Result> results) {
		this.results = results;
	}

	public List<Sample> getSamples() {
		return samples;
	}

	public void setSamples(List<Sample> samples) {
		this.samples = samples;
	}
	
	
	
}
