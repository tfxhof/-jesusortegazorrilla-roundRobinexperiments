package es.unican.tfg.service;

import java.util.List;

import es.unican.tfg.model.Experiment;

public interface IExperimentService {

	/**
	 * get the list of experiments from database
	 * @return the list of experiments
	 */
	public List<Experiment> experiments();
	
	/**
	 * get one experiments by its ID
	 * @return the searched experiment or null
	 */
	public Experiment experimentById(long id);
	
	/**
	 * create a new experiment
	 * @return the created exp or null if already exists an 
	 * experiment with given name
	 */
	public Experiment createExperiment(Experiment exp);
	
	/**
	 * modify an existing experiment
	 * @return the modified experiment
	 */
	public Experiment modifyExperiment(Experiment e);
	
	/**
	 * delete an experiment
	 * @return the deleted experiment or null if not found
	 */
	public Experiment deleteExperiment(Long id);
	
}

