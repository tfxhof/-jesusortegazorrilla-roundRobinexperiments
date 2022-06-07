package es.unican.tfg.service;

import java.util.List;

import es.unican.tfg.model.Experiment;
import es.unican.tfg.model.ResearchCenter;

public interface IResearchCenterService {

	/**
	 * get the list of experiments from database
	 * @return the list of experiments
	 */
	public List<ResearchCenter> researchCenters();
	
	/**
	 * get one experiments by its ID
	 * @return the searched experiment or null
	 */
	public ResearchCenter researchCenterById(Long id);
	
	/**
	 * create a new experiment
	 * @return the created exp or null if already exists an 
	 * experiment with given name
	 */
	public ResearchCenter createResearchCenter(ResearchCenter r);
	
	/**
	 * modify an existing experiment
	 * @return the modified experiment
	 */
	public ResearchCenter modifyResearchCenter(ResearchCenter r);
	
	/**
	 * delete an experiment
	 * @return the deleted experiment or null if not found
	 */
	public ResearchCenter deleteResearchCenter(Long id);
	
}

