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

import es.unican.tfg.model.Measurement;
import es.unican.tfg.service.MeasurementService;

@RestController
@RequestMapping("/measurements")
@CrossOrigin
public class MeasurementController {

	@Autowired
	private MeasurementService measurementService;

	/**
	 * Get the list of experiments or 404 if there are no experiments
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
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
		Measurement created = measurementService.modify(m);
		if (created == null) //if null, already exists the experiment
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		return ResponseEntity.ok(created);
	}

	/**
	 * Get an experiment or 404 if does not exist
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Measurement> getOne(@PathVariable Long id) throws InterruptedException, ExecutionException {
		Measurement m = measurementService.findById(id);
		if (m == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(m);
	}

	/**
	 * Method to create an experiment (Unknown id so POST instead of PUT)
	 * @param exp
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@PostMapping
	public ResponseEntity<Measurement> create(@RequestBody Measurement m) throws InterruptedException, ExecutionException {
		Measurement me = measurementService.create(m);
		if (me == null)
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
		return ResponseEntity.created(location).body(me);
	}

	/**
	 * Delete an experiment
	 * @param userName
	 * @return
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Measurement> delete(@PathVariable Long id) {
		Measurement m = measurementService.delete(id);
		if (m == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(m);    	
	}


	@GetMapping("/test")
	public String getHolaMundo() {
		return "Hola Mundo!";
	}


}
