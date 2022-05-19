package es.unican.tfg.controller;

import java.net.URI;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import es.unican.tfg.model.Experiment;
import es.unican.tfg.service.ExperimentService;

@RestController
@RequestMapping("/experiments")
public class ExperimentController {

	@Autowired
	private ExperimentService experimentService;


	/**
	 * 
	 * @param experimentService
	 */
	public ExperimentController(ExperimentService experimentService) {
		super();
		this.experimentService = experimentService;
	}

	/**
	 * 
	 */
	public ExperimentController() {
		super();
	}


	/**
	 * Get an experiment or 404 if does not exist
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Experiment> getExperiment(@RequestParam int id) throws InterruptedException, ExecutionException {
		Experiment e = experimentService.getExperiment(id);
		if (e != null)
			return ResponseEntity.ok(e);
		return ResponseEntity.notFound().build();
	}


	/**
	 * Method to create an experiment (Unknown id so POST instead of PUT)
	 * @param exp
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@PostMapping
	public ResponseEntity<Experiment> createExperiment(@RequestBody Experiment exp) throws InterruptedException, ExecutionException {
		Experiment e = experimentService.createExperiment(exp);
		if (e == null)
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
		return ResponseEntity.created(location).body(e);
	}

	
	/**
	 * Delete an experiment
	 * @param userName
	 * @return
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Experiment> deleteExperiment(@PathVariable long id) {
		Experiment e = experimentService.deleteExperiment(id);
		if (e == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(e);    	

	}


}
