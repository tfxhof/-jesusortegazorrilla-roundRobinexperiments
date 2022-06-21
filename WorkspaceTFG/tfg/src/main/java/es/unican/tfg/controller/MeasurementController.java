package es.unican.tfg.controller;

import java.net.URI;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import es.unican.tfg.DTOs.MeasurementDTO;
import es.unican.tfg.model.Instrument;
import es.unican.tfg.model.Measurement;
import es.unican.tfg.model.Parameter;
import es.unican.tfg.model.Result;
import es.unican.tfg.service.MeasurementService;

@RestController
@RequestMapping("/measurements")
@CrossOrigin
public class MeasurementController implements IMeasurementController{

	@Autowired
	private MeasurementService measurementService;
	


	@GetMapping
	public ResponseEntity<List<Measurement>> getAll() {
		List<Measurement> measurements = measurementService.findAll();
		if (measurements == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(measurements);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Measurement> modify(@RequestBody Measurement m, @PathVariable Long id) {
		Measurement created = measurementService.modifyMeasurement(m);
		if (created == null) //if null, already exists the experiment
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		return ResponseEntity.ok(created);
	}

	
	@GetMapping("/{id}")
	public ResponseEntity<Measurement> getOne(@PathVariable Long id) throws InterruptedException, ExecutionException {
		Measurement m = measurementService.findById(id);
		if (m == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(m);
	}


//	@PostMapping
//	public ResponseEntity<Measurement> create(@RequestBody Measurement m) throws InterruptedException, ExecutionException {
//		Measurement me = measurementService.createMeasurement(m);
//		if (me == null)
//			return ResponseEntity.status(HttpStatus.CONFLICT).build();
//		URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
//		return ResponseEntity.created(location).body(me);
//	}

	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Measurement> delete(@PathVariable Long id) {
		Measurement m = measurementService.delete(id);
		if (m == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(m);    	
	}

	@GetMapping("/{id}/results")
	public ResponseEntity<List<Result>> getAllResults(Long id) {
		Measurement measurement = measurementService.findById(id);
		if (measurement == null || measurement.getResults() == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(measurement.getResults());
	}

	@GetMapping("/{id}/parameters")
	public ResponseEntity<List<Parameter>> getAllParamenters(Long id) {
		Measurement measurement = measurementService.findById(id);
		if (measurement == null || measurement.getResults() == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(measurement.getParameters());
	}

	
	@GetMapping("/{id}/instrument")
	public ResponseEntity<Instrument> getInstrument(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@PostMapping("/{name}/instruments")
	public ResponseEntity<MeasurementDTO> addInstrument(@PathVariable String name, @RequestBody Instrument i){
		
		Measurement m = measurementService.findByName(name);
		if (m == null) {
			return ResponseEntity.notFound().build();
		}
		
		m.setInstrument(i);
		measurementService.modifyMeasurement(m);
		
		return ResponseEntity.ok(new MeasurementDTO(m));
	}

	
	@PostMapping("/{name}/results")
	public ResponseEntity<MeasurementDTO> addResult(@PathVariable String name, @RequestBody Result r){
		
		//Check if the measurement exists in the database
		Measurement m = measurementService.findByName(name);
		if (m == null) {
			return ResponseEntity.notFound().build();
		}
		
		//Dont need this SYSO, it is to try to see the uploaded file
		System.out.println("File: " + r.getFile());
		//To set if the result was successful or not
		if (r.getSuccessful().equals("yes")) {
			r.setSatisfactory(true);
		} else 
			r.setSatisfactory(false);
		
		
		m.getResults().add(r);
		measurementService.modifyMeasurement(m);
		
		return ResponseEntity.ok(new MeasurementDTO(m));
	}
	
	
	



	@GetMapping("/test")
	public String getHolaMundo() {
		return "Hola Mundo!";
	}
	
}
