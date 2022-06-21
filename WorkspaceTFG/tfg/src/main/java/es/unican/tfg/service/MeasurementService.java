package es.unican.tfg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unican.tfg.model.Measure;
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
	
	//check if given exp has a measure with given name
	public Measure findMeasure(List<Measure> measures, String name) {
		for (Measure m: measures) {
			if (m.getName().equals(name)) {
				return m;
			}
		}
		return null;
	}
	
	//check if given measure has a measurement with given name
	public Measurement findMeasurement(List<Measurement> measurements, String name) {
		for (Measurement m: measurements) {
			if (m.getName().equals(name)) {
				return m;
			}
		}
		return null;
	}
	
	public Measurement createMeasurement(Measurement m, String mName) {	
		Measurement toAdd = new Measurement(m.getExecutingCenter(), mName, null, null, null, null);
		if (measurementRepository.findByName(toAdd.getName()) == null)//if null it creates the experiment
			return measurementRepository.save(toAdd);
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
