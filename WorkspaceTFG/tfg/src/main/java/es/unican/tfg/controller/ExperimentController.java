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

import DTOs.ExperimentDTO;
import es.unican.tfg.model.Experiment;
import es.unican.tfg.model.ResearchCenter;
import es.unican.tfg.service.ExperimentService;
import es.unican.tfg.service.ResearchCenterService;

@RestController
@RequestMapping("/experiments")
@CrossOrigin
public class ExperimentController {

	@Autowired
	private ExperimentService experimentService;
	
	@Autowired
	private ResearchCenterService centerService;

	/**
	 * Get the list of experiments or 404 if there are no experiments
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@GetMapping
	public ResponseEntity<List<Experiment>> getExperiments() {
		List<Experiment> experiments = experimentService.experiments();
		if (experiments == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(experiments);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Experiment> modifyExperiment(@RequestBody Experiment e, @PathVariable Long id) {
		Experiment created = experimentService.modifyExperiment(e);
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
	@GetMapping("/{name}")
	public ResponseEntity<ExperimentDTO> getExperiment(@PathVariable String name) throws InterruptedException, ExecutionException {
		Experiment e = experimentService.experimentByName(name);
		if (e == null) {
			return ResponseEntity.notFound().build();
		}
		ExperimentDTO ex = new ExperimentDTO(e);
		return ResponseEntity.ok(ex);
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
		System.out.println("Creador: " + exp.getCreator().getEmail());
		ResearchCenter rc = centerService.researchCenterByEmail(exp.getCreator().getEmail());
		if(rc == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		
		exp.setCreator(rc);
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
	public ResponseEntity<Experiment> deleteExperiment(@PathVariable Long id) {
		Experiment e = experimentService.deleteExperiment(id);
		if (e == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(e);    	
	}


	@GetMapping("/test")
	public String getHolaMundo() {
		return "Hola Mundo!";
	}


}
