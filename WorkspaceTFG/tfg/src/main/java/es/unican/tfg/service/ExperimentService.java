package es.unican.tfg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unican.tfg.model.Experiment;
import es.unican.tfg.repository.ExperimentRepository;

@Service
public class ExperimentService implements IExperimentService{	

	@Autowired
	private ExperimentRepository expRepository;


	public List<Experiment> experiments() {
		return expRepository.findAll();
	}

	public Experiment experimentById(long id) {
		return expRepository.findById(id).orElse(null);
	}
	public Experiment experimentByName(String name) {
		Experiment e = expRepository.findByName(name);
		if (e != null) {
			return e;
		}
		return null;
	}

	public Experiment createExperiment(Experiment exp) {	
		if (expRepository.findByName(exp.getName()) == null)//if null it creates the experiment
			return expRepository.save(exp);
		return null;
	}

	public Experiment modifyExperiment(Experiment e) {
		if (expRepository.findById(e.getId()) == null)//if null it return null
			return null;
		return expRepository.save(e);
	}

	public Experiment deleteExperiment(Long id) {
		Experiment e = expRepository.findById(id).orElse(null);
		if (e == null)
			return null;
		expRepository.deleteById(e.getId());
		return e;
	}



}
