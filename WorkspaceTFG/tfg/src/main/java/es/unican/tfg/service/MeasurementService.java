package es.unican.tfg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unican.tfg.model.Measurement;
import es.unican.tfg.model.ResearchCenter;
import es.unican.tfg.model.Result;
import es.unican.tfg.repository.MeasurementRepository;
import es.unican.tfg.repository.ResearchCenterRepository;
import es.unican.tfg.repository.ResultRepository;

@Service
public class MeasurementService implements IMeasurementService{	

	@Autowired
	private MeasurementRepository measurementRepository;

	@Autowired
	private ResultRepository resultRepository;

	public List<Measurement> findAll() {
		return measurementRepository.findAll();
	}

	public Measurement findById(long id) {
		return measurementRepository.findById(id).orElse(null);
	}
	
	public Measurement findByName (String name) {
		return measurementRepository.findByName(name);
	}

	public Measurement create(Measurement m) {	
		if (measurementRepository.findById(m.getId()) == null)//if null it creates the experiment
			return measurementRepository.save(m);
		return null;
	}

	public Measurement modifyMeasurement(Measurement m) {
		if (measurementRepository.findByName(m.getName()) == null)//if null it return null
			return null;
		return measurementRepository.save(m);
	}

	public Measurement delete(Long id) {
		Measurement m = measurementRepository.findById(id).orElse(null);
		if (m == null)
			return null;
		measurementRepository.deleteById(m.getId());
		return m;
	}
	
	
	public Result addResult(Result result) {
		return resultRepository.save(result);
	}



}
