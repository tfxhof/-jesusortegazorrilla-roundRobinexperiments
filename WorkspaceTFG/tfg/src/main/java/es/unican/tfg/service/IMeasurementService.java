package es.unican.tfg.service;

import java.util.List;

import es.unican.tfg.model.Measurement;

public interface IMeasurementService {

	/**
	 * get the list of experiments from database
	 * @return the list of experiments
	 */
	public List<Measurement> findAll();
	
	/**
	 * get one experiments by its ID
	 * @return the searched experiment or null
	 */
	public Measurement findById(long id);
	
	/**
	 * create a new experiment
	 * @return the created exp or null if already exists an 
	 * experiment with given name
	 */
	public Measurement create(Measurement exp);
	
	/**
	 * modify an existing experiment
	 * @return the modified experiment
	 */
	public Measurement modifyMeasurement(Measurement e);
	
	/**
	 * delete an experiment
	 * @return the deleted experiment or null if not found
	 */
	public Measurement delete(Long id);
	
}

