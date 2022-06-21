package es.unican.tfg.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import es.unican.tfg.model.Instrument;
import es.unican.tfg.model.Measurement;
import es.unican.tfg.model.Parameter;
import es.unican.tfg.model.Result;

public interface IMeasurementController {

	/**
	 * Get the list of experiments or 404 if there are no experiments
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@GetMapping
	public ResponseEntity<List<Measurement>> getAll();

	/**
	 * Modify an existing measurement or CONFLICT if does not exist
	 * @param m
	 * @param id
	 * @return
	 */
	@PutMapping("/{id}")
	public ResponseEntity<Measurement> modify(@RequestBody Measurement m, @PathVariable Long id);

	/**
	 * Get an experiment or 404 if does not exist
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Measurement> getOne(@PathVariable Long id) throws InterruptedException, ExecutionException;

	/**
	 * Method to create an experiment (Unknown id so POST instead of PUT)
	 * @param exp
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@PostMapping
//	public ResponseEntity<Measurement> create(@RequestBody Measurement m) throws InterruptedException, ExecutionException;

	/**
	 * Delete an experiment
	 * @param userName
	 * @return
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Measurement> delete(@PathVariable Long id);


	
	/**
	 * @param id of the measurement which you want to get results from
	 * @return
	 */
	@GetMapping("/{id}/results")
	public ResponseEntity<List<Result>> getAllResults(@PathVariable Long id);
	
	
	
	/**
	 * @param id of the measurement which you want to get parameters from
	 * @return
	 */
	@GetMapping("/{id}/parameters")
	public ResponseEntity<List<Parameter>> getAllParamenters(@PathVariable Long id);
	
	
	/**
	 * @param id of the measurement which you want to get the instrument from
	 * @return
	 */
	@GetMapping("/{id}/instrument")
	public ResponseEntity<Instrument> getInstrument(@PathVariable Long id);
	
	
	
	
	
	
	@GetMapping("/test")
	public String getHolaMundo();
	
}
