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
 * measurement of a measure in a specific center
 * @author Jesus
 *
 */
@Entity
public class Measurement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne
	@JoinColumn(name="researchCenter_fk")
	private ResearchCenter executingCenter;
	
	@OneToOne
	@JoinColumn(name="measure_fk")
	private Measure measure;
	
	@OneToOne
	@JoinColumn(name="instrument_fk")
	private Instrument instrument;
	
	@OneToMany
	@JoinColumn(name="measurement_fk")
	private List<Parameter> parameters;
	
	@OneToMany
	@JoinColumn(name="measurement_fk")
	private List<Result> results;
	
	@OneToMany
	@JoinColumn(name="measurement_fk")
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

	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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
