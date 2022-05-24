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

import es.unican.tfg.model.ResearchCenter;
import es.unican.tfg.service.ResearchCenterService;

@RestController
@RequestMapping("/centers")
@CrossOrigin
public class ResearchCenterController {

	@Autowired
	private ResearchCenterService centerService;

	/**
	 * Get the list of Research centers or 404 if there are no RC
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@GetMapping
	public ResponseEntity<List<ResearchCenter>> getAll() {
		List<ResearchCenter> centers = centerService.researchCenters();
		if (centers == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(centers);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ResearchCenter> modify(@RequestBody ResearchCenter r, @PathVariable Long id) {
		ResearchCenter created = centerService.modifyResearchCenter(r);
		if (created == null) //if null, already exists the experiment
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		return ResponseEntity.ok(created);
	}

	/**
	 * Get a research Center or 404 if does not exist
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@GetMapping("/{id}")
	public ResponseEntity<ResearchCenter> getOne(@PathVariable Long id) throws InterruptedException, ExecutionException {
		ResearchCenter r = centerService.researchCenterById(id);
		if (r == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(r);
	}

	/**
	 * Method to create a research Center (Unknown id so POST instead of PUT)
	 * @param exp
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@PostMapping
	public ResponseEntity<ResearchCenter> create(@RequestBody ResearchCenter r) throws InterruptedException, ExecutionException {
		ResearchCenter rc = centerService.createResearchCenter(r);
		if (rc == null)
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
		return ResponseEntity.created(location).body(rc);
	}

	/**
	 * Delete an Research Center
	 * @param userName
	 * @return
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<ResearchCenter> delete(@PathVariable Long id) {
		ResearchCenter r = centerService.deleteResearchCenter(id);
		if (r == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(r);    	
	}


	@GetMapping("/test")
	public String getHolaMundo() {
		return "Hola Mundo!";
	}


}
