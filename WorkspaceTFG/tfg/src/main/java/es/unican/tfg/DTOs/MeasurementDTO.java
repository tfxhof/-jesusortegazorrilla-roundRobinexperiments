package es.unican.tfg.DTOs;

import java.util.List;

import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import es.unican.tfg.model.Instrument;
import es.unican.tfg.model.Measurement;
import es.unican.tfg.model.Parameter;
import es.unican.tfg.model.ResearchCenter;
import es.unican.tfg.model.Result;
import es.unican.tfg.model.Sample;

public class MeasurementDTO {

	private Long id;
	private String name;
	private String executingCenterEmail;
	private Instrument instrument;
	private List<Parameter> parameters;
	private List<Result> results;
	private List<Sample> samples;
	

	public MeasurementDTO() {}
	
	/**
	 * @param id
	 * @param name
	 * @param executingCenterName
	 * @param instrument
	 * @param parameters
	 * @param results
	 * @param samples
	 */
	public MeasurementDTO(Measurement m) {
		super();
		this.id = m.getId();
		this.name = m.getName();
		this.executingCenterEmail = m.getExecutingCenter().getEmail();
		this.instrument = m.getInstrument();
		this.parameters = m.getParameters();
		this.results = m.getResults();
		this.samples = m.getSamples();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getExecutingCenterEmail() {
		return executingCenterEmail;
	}
	public void setExecutingCenterEmail(String executingCenterName) {
		this.executingCenterEmail = executingCenterName;
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
