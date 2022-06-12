package es.unican.tfg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unican.tfg.model.Experiment;
import es.unican.tfg.model.Measure;
import es.unican.tfg.model.Measurement;
import es.unican.tfg.model.Sample;
import es.unican.tfg.repository.ExperimentRepository;
import es.unican.tfg.repository.MeasureRepository;
import es.unican.tfg.repository.SampleRepository;

@Service
public class ExperimentService implements IExperimentService{	

	@Autowired
	private ExperimentRepository expRepository;
	
	@Autowired
	private SampleRepository sampleRepository;
	
	@Autowired
	private MeasureRepository measureRepository;


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
	
	public Sample addSample(Sample sample) {
		return sampleRepository.save(sample);
	}
	public Sample findSampleByCode(String code) {
		return sampleRepository.findByCode(code);
	}
	
	public Measure addMeasure(Measure measure) {
		return measureRepository.save(measure);
	}
	
	public Measure measureByNameAndExperiment (Experiment e, String name) {
		for (Measure me: e.getMeasures()) {
			if (me.getName().equals(name)) {
				return me;
			}
		}
		return null;
	}
	

	public Measurement measurementByNameAndMeasure (Measure m, String name) {
		for (Measurement me: m.getMeasurements()) {
			if (me.getName().equals(name)) {
				return me;
			}
		}
		return null;
	}
	
	



}
