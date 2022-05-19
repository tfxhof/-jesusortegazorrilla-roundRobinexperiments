package es.unican.tfg.service;

import es.unican.tfg.model.Experiment;

public interface IExperimentService {

	
	public String createExperiment(Experiment exp);
	
	public Experiment getExperiment(int id);
	
}

