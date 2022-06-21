package es.unican.tfg.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

/**
 * measurement of a measure in a specific center
 * @author Jesus
 *
 */
@Entity
public class Measurement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	 
	private String name;
	
	@OneToOne
	@JoinColumn(name="researchCenter_fk")
	private ResearchCenter executingCenter;
	
//	@OneToOne
//	@JoinColumn(name="measure_fk")
//	@Transient
//	private Measure measure;
	@Transient
	private String measureName;
	
	@OneToOne(cascade = {CascadeType.ALL})
	@JoinColumn(name="instrument_fk")
	private Instrument instrument;
	
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name="measurement_fk")
	private List<Parameter> parameters;
	
	@OneToMany(cascade = {CascadeType.ALL})
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
	public Measurement(ResearchCenter executingCenter, String measureName/*, Measure measure*/, Instrument instrument,
			List<Parameter> parameters, List<Result> results, List<Sample> samples) {
		super();
		//TODO: If the same center has 2 instrument to measure the same, this might be a problem
		this.name = "'" + measureName + "' in '" + executingCenter.getName() + "'"; //example: 'Dureza del Carbono in Atlantico'
		this.executingCenter = executingCenter;
		//this.measure = measure;
		this.instrument = instrument;
		this.parameters = parameters;
		this.results = results;
		this.samples = samples;
	}

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ResearchCenter getExecutingCenter() {
		return executingCenter;
	}

	public void setExecutingCenter(ResearchCenter executingCenter) {
		this.executingCenter = executingCenter;
	}

//	public Measure getMeasure() {
//		return measure;
//	}
//
//	public void setMeasure(Measure measure) {
//		this.measure = measure;
//	}

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMeasureName() {
		return measureName;
	}

	public void setMeasureName(String measureName) {
		this.measureName = measureName;
	}
	
	
	
}
