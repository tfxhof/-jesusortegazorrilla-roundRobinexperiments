package es.unican.tfg.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import javax.ws.rs.QueryParam;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import DTOs.ExperimentDTO;
import DTOs.MeasureDTO;
import DTOs.MeasurementDTO;
import es.unican.tfg.model.Experiment;
import es.unican.tfg.model.ExperimentStatus;
import es.unican.tfg.model.Measure;
import es.unican.tfg.model.Measurement;
import es.unican.tfg.model.ResearchCenter;
import es.unican.tfg.model.Result;
import es.unican.tfg.model.Sample;
import es.unican.tfg.service.ExperimentService;
import es.unican.tfg.service.MeasurementService;
import es.unican.tfg.service.ResearchCenterService;

@RestController
@RequestMapping("/experiments")
@CrossOrigin
public class ExperimentController {

	@Autowired
	private ExperimentService experimentService;

	@Autowired
	private ResearchCenterService centerService;

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
		exp.setStatus(ExperimentStatus.CREATED);
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

	@PostMapping("/{name}/participants")
	public ResponseEntity<ExperimentDTO> addParticipant(@PathVariable String name, @RequestBody ResearchCenter rc){
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		ResearchCenter r = centerService.researchCenterByEmail(rc.getEmail());
		if (r == null)
			return ResponseEntity.notFound().build();

		//		r.getExperiments().add(e);
		//		centerService.modifyResearchCenter(r);
		List <ResearchCenter> centers = e.getParticipants();
		centers.add(r);
		e.setParticipants(centers);
		experimentService.modifyExperiment(e);
		ExperimentDTO eDTO = new ExperimentDTO(e);
		return ResponseEntity.ok(eDTO);
	}


	@PostMapping("/{name}/samples")
	public ResponseEntity<ExperimentDTO> addSamples(@PathVariable String name, @RequestBody Sample sample){
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		Sample s = experimentService.addSample(sample);

		List <Sample> samples = e.getSamples();
		samples.add(s);
		e.setSamples(samples);
		experimentService.modifyExperiment(e);

		ExperimentDTO eDTO = new ExperimentDTO(e);
		return ResponseEntity.ok(eDTO);
	}

	@PostMapping("/{name}/measures")
	public ResponseEntity<ExperimentDTO> addMeasure(@PathVariable String name, @RequestBody Measure measure){
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		Sample s = experimentService.findSampleByCode(measure.getSample().getCode());
		if (s == null) {
			return ResponseEntity.notFound().build();			
		}

		measure.setSample(s);
		Measure m = experimentService.addMeasure(measure);

		List <Measure> measures = e.getMeasures();
		measures.add(m);
		e.setMeasures(measures);
		experimentService.modifyExperiment(e);

		ExperimentDTO eDTO = new ExperimentDTO(e);
		return ResponseEntity.ok(eDTO);
	}


	@GetMapping("/{name}/creator")
	public ResponseEntity<String> getCreatorEmail(@PathVariable String name) {
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(e.getCreator().getEmail());
	}


	@PostMapping("/{expName}/measures/{measureName}/measurements/{measurementName}/results")
	public ResponseEntity<Result> addResult(@PathVariable String expName, 
			@PathVariable String measureName, 
			@PathVariable String measurementName, 
			@RequestBody Result result){

		System.out.println("File: " + result.getFile());

		if (result.getSuccessful().equals("yes")) {
			result.setSatisfactory(true);
		} else 
			result.setSatisfactory(false);			


		Experiment e = experimentService.experimentByName(expName);
		if (e == null)
			return ResponseEntity.notFound().build();

		Measure m = experimentService.measureByNameAndExperiment(e, measureName);
		if (m == null)
			return ResponseEntity.notFound().build();

		Measurement me = experimentService.measurementByNameAndMeasure(m, measurementName);
		if (me == null)
			return ResponseEntity.notFound().build();

		Result r = measurementService.addResult(result);
		me = measurementService.findByName(measurementName);
		me.getResults().add(r);
		measurementService.modifyMeasurement(me);

		return ResponseEntity.ok(r);
	}

	/**
	 * To show only the measures asociated to the given center
	 * @param name
	 * @return
	 */
	@GetMapping("/{name}/measures")
	public ResponseEntity<List<MeasureDTO>> getMeasures(@PathVariable String name, @RequestParam(value="email", required=false) String email){
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		List<Measure> measures = e.getMeasures();
		if (measures == null)
			return ResponseEntity.notFound().build();

		List<MeasureDTO> aux = new ArrayList<MeasureDTO>();
		//si no especifica email devuelvo todas las measures del experimento
		if (email == null) {
			for (Measure m: measures) {
				aux.add(new MeasureDTO(m));
			}
		} else { //si se especifica email devuelva las measures en las que haya algun measurement asignado al email dado
			for (Measure m: measures) {
				for (Measurement me: m.getMeasurements()){
					if (me.getExecutingCenter().getEmail().equals(email)) {
						aux.add(new MeasureDTO(m));
					}//if
				}//for
			}//for
		}//if-else
		return ResponseEntity.ok(aux);

	}

	@GetMapping("/{name}/measures/{mName}")
	public ResponseEntity<MeasureDTO> getMeasure(@PathVariable String name, @PathVariable String mName){
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		List<Measure> measures = e.getMeasures();
		if (measures == null)
			return ResponseEntity.notFound().build();


		for (Measure m: measures) {
			if (m.getName().equals(mName))
				return ResponseEntity.ok(new MeasureDTO(m));
		}
		return null;
	}
	
	
	@GetMapping("/{name}/measures/{mName}/centers/{email}/measurements")
	public ResponseEntity<MeasurementDTO> getMeasurementOfCenter(@PathVariable String name, @PathVariable String mName, @PathVariable String email){
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		List<Measure> measures = e.getMeasures();
		if (measures == null)
			return ResponseEntity.notFound().build();

		Measure m = measurementService.findMeasure(measures, mName);
		
		for (Measurement me: m.getMeasurements()) {
			if(me.getExecutingCenter().getEmail().equals(email)) 
				return ResponseEntity.ok(new MeasurementDTO(me));
		}
		return null;
	}
	
	
	

	/**
	 * To check if the accesing center has any measurement assigned to this measure.
	 * @param name
	 * @param mName
	 * @return
	 */
	@GetMapping("/{name}/measures/{mName}/centers/{email}")
	public ResponseEntity<Boolean> checkMeasures(@PathVariable String name, @PathVariable String mName, @PathVariable String email){
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		List<Measure> measures = e.getMeasures();
		if (measures == null)
			return ResponseEntity.notFound().build();

		Measure m = measurementService.findMeasure(measures, mName);

		for (Measurement me: m.getMeasurements()) {
			if(me.getExecutingCenter().getEmail().equals(email)) 
				return ResponseEntity.ok(true);
		}	

		return ResponseEntity.ok(false);
	}


}
