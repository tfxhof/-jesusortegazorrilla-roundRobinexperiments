package es.unican.tfg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unican.tfg.model.Experiment;
import es.unican.tfg.repository.ExperimentRepository;

@Service
public class ExperimentService {	

	@Autowired
	private ExperimentRepository expRepository;

	public Experiment getExperiment(long id) {
		return expRepository.findById(id).orElse(null);
	}

	public Experiment createExperiment(Experiment exp) {	
		if (expRepository.findById(exp.getId()) == null)
			return expRepository.save(exp);
		return null;
	}
	
	public Experiment deleteExperiment(long id) {
		Experiment e = expRepository.findById(id).orElse(null);
		if (e == null)
			return null;
		expRepository.deleteById(e.getId());
		return e;
	}

}
