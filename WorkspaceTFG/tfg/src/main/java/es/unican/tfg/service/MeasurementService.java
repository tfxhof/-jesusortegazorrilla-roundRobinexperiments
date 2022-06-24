package es.unican.tfg.service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unican.tfg.DTOs.ResultGraph;
import es.unican.tfg.DTOs.ResultGraphItem;
import es.unican.tfg.model.Measure;
import es.unican.tfg.model.Measurement;
import es.unican.tfg.model.ResearchCenter;
import es.unican.tfg.model.Result;
import es.unican.tfg.repository.MeasureRepository;
import es.unican.tfg.repository.MeasurementRepository;
import es.unican.tfg.repository.ResearchCenterRepository;
import es.unican.tfg.repository.ResultRepository;

@Service
public class MeasurementService implements IMeasurementService{	

	@Autowired
	private MeasurementRepository measurementRepository;

	@Autowired
	private MeasureRepository measureRepository;

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

	//
	public Measure findMeasureByname(String name) {
		return measureRepository.findByName(name);
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
	
	
	public ResultGraph csvReader (String absolutePath) throws IOException {
		Reader reader = new FileReader(absolutePath);
		CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withIgnoreHeaderCase().withTrim());

		String xAxisName = null;
		String yAxisName = null;

		List <ResultGraphItem> values = new ArrayList<ResultGraphItem>();

		boolean nameStored = false;
		//String specialChars = "!@#$%&*()'+-/:;<=>?[]^_`{|}";
		//boolean check = false;
		double xValue = 0;
		double yValue = 0;

		//iterate the file
		for (CSVRecord csvRecord: csvParser) {
			//To check if current line begin with especial characters such as '########'
			//if (specialChars.contains(Character.toString(csvRecord.get(0).charAt(0))))
			//	break;

			if(nameStored == false) {
				xAxisName = csvRecord.get(0).replace("_", " ").replace("-", " ");
				yAxisName = csvRecord.get(1).replace("_", " ").replace("-", " ");
				nameStored = true;
			} else {
				if(csvRecord.get(0).length() >= 5) {
					xValue = Double.parseDouble(csvRecord.get(0).substring(0, 5));
				}else {
					xValue = Double.parseDouble(csvRecord.get(0));					
				}

				if(csvRecord.get(1).length() >= 5) {
					yValue = Double.parseDouble(csvRecord.get(1).substring(0, 5));					
				} else {
					yValue = Double.parseDouble(csvRecord.get(1));										
				}
				values.add(new ResultGraphItem(xValue, yValue));
			}
		}

		return new ResultGraph(xAxisName, yAxisName, values);
	}



}
