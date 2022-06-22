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

import es.unican.tfg.DTOs.ExperimentDTO;
import es.unican.tfg.DTOs.MeasureDTO;
import es.unican.tfg.DTOs.MeasurementDTO;
import es.unican.tfg.DTOs.ResultGraph;
import es.unican.tfg.DTOs.ResultGraphItem;
import es.unican.tfg.email.EmailSender;
import es.unican.tfg.email.EmailService;
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

import es.unican.tfg.common.Constraints;


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

	@Autowired
	private EmailService emailService;


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

	@GetMapping("/{name}/start")
	public ResponseEntity<ExperimentDTO> startExperiment(@PathVariable String name){
		Experiment e = experimentService.experimentByName(name);
		if (e == null) {
			return ResponseEntity.notFound().build();
		}
		e.setStatus(ExperimentStatus.STARTED);
		experimentService.modifyExperiment(e);
		ExperimentDTO ex = new ExperimentDTO(e);
		return ResponseEntity.ok(ex);
	}

	@GetMapping("/{name}/finish")
	public ResponseEntity<ExperimentDTO> finishExperiment(@PathVariable String name){
		Experiment e = experimentService.experimentByName(name);
		if (e == null) {
			return ResponseEntity.notFound().build();
		}
		e.setStatus(ExperimentStatus.FINISHED);
		experimentService.modifyExperiment(e);
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
	public ResponseEntity<Experiment> createExperiment(
			@RequestBody Experiment exp, 
			@RequestParam(value="participates", required=true) String participates) 
					throws InterruptedException, ExecutionException {


		exp.setStatus(ExperimentStatus.CREATED);
		ResearchCenter rc = centerService.researchCenterByEmail(exp.getCreator().getEmail());
		if(rc == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		exp.setCreator(rc);
		//Add the research center as a participant of the experiment
		if (participates.equals("yes")) {
			List <ResearchCenter> participants = new ArrayList<ResearchCenter>();
			participants.add(rc);
			exp.setParticipants(participants);
		}


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
	public ResponseEntity<ExperimentDTO> sendEmailToAddParticipant(@PathVariable String name, @RequestBody ResearchCenter rc){
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		ResearchCenter r = centerService.researchCenterByEmail(rc.getEmail());
		//if given center is registered, check if it is already a participant, and CONFLICT if so, if it is not participating, send email
		if (r != null) {
			for (ResearchCenter center: e.getParticipants()) {
				if(center.getEmail().equals(r.getEmail()))
					return ResponseEntity.status(409).build();
			}
			//Send email with *the link to accept invitation*
			String link = "http://localhost:3000/ConfirmParticipant";

			emailService.sendSimpleEmail(rc.getEmail(), "Invitation to participate in '" + name + "' experiment", 
					"Click this link below to accept the invitation to participate in '" + name + "' experiment:" + 
							"\n\n" + link);


		} else { //if the center is not registered
			//TODO:
			//Esta llamada igual se tiene que hacer desde la web y que el link solo lleve a la web y al clickar en un boton se llame a este metodo
			String link = "http://localhost:3000/SignUpParticipant/";

			//TODO: complete the email with *the link to accept invitation* an go to a screen to enter their data(not done yet)
			//this links will have to call something like expService.addParticipantFromEmail(ResearchCenter)
			emailService.sendSimpleEmail(rc.getEmail(), 
					"Invitation to participate in '" + name + "' experiment" , 
					"You have been invited to participate in '" + name + "' experiment. As you are not registered yet in " + "Round Robin TFG" +", you can do it by clicking the link below: \n\n" 
							+ link);
		}
		return ResponseEntity.ok(new ExperimentDTO(e));
	}


	@PostMapping("/{name}/participants/{email}/confirm")
	public ResponseEntity<ExperimentDTO> confirmParticipant(@PathVariable String name, 
			@PathVariable String email, @RequestBody ResearchCenter rc){

		Experiment e = experimentService.addParticipantFromEmail(name, email, rc);
		if (e == null) {
			return ResponseEntity.status(409).build();
		}
		return ResponseEntity.ok(new ExperimentDTO(e));

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

		//		Sample s = experimentService.findSampleByCode(measure.getSample().getCode());
		//		if (s == null) {
		//			return ResponseEntity.notFound().build();			
		//		}

		//		measure.setSample(s);
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

	@GetMapping("/{name}/measures/{mName}/measurements")
	public ResponseEntity<List<MeasurementDTO>> getMeasurements(@PathVariable String name, @PathVariable String mName, 
			@RequestParam(value="center", required=false) String centerName ){

		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		List<Measure> measures = e.getMeasures();
		if (measures == null)
			return ResponseEntity.notFound().build();

		Measure m = measurementService.findMeasure(measures, mName);
		if (m == null)
			return ResponseEntity.notFound().build();


		List <MeasurementDTO> measurements = new ArrayList<MeasurementDTO>();
		if (m.getMeasurements() == null){
			return ResponseEntity.notFound().build();
		} else {
			for(Measurement mea: m.getMeasurements()) {
				if (centerName == null) {//If there is no filter by center
					measurements.add(new MeasurementDTO(mea));
				}
				else { //If client wants to show measurements associated to given center
					if (centerName.equals(mea.getExecutingCenter().getName())) {
						measurements.add(new MeasurementDTO(mea));
					}
				}
			}

		}		
		return ResponseEntity.ok(measurements);
	}

	@PostMapping("/{name}/measures/{mName}/measurements")
	public ResponseEntity<MeasurementDTO> addMeasurement(@PathVariable String name, @PathVariable String mName, @RequestBody Measurement measurement){

		System.out.println("Centro email: " + measurement.getExecutingCenter().getEmail());
		System.out.println("Nombre falso: " + measurement.getName());
		System.out.println("Nombre Measure real: " + measurement.getMeasureName());
		
		ResearchCenter rc = centerService.researchCenterByEmail(measurement.getExecutingCenter().getEmail());
		measurement.setExecutingCenter(rc);
		


		//Check if exist an experiment with given name
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		//Check if there are measures asociated to the experiment
		List<Measure> measures = e.getMeasures();
		if (measures == null)
			return ResponseEntity.notFound().build();
		//Check if exists a measure with given name
		Measure m = measurementService.findMeasure(measures, mName);
		if (m == null)
			return ResponseEntity.notFound().build();

		//Add the measurement
		Measurement mea = measurementService.createMeasurement(measurement, mName);
		if(mea == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		
		//To associate the measurement with the measure in database
		Measure measure = measurementService.findMeasureByname(mName);
		measure.getMeasurements().add(mea);
		experimentService.modifyMeasure(measure);
		
		MeasurementDTO mDTO = new MeasurementDTO(mea);

		return ResponseEntity.ok(mDTO);
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

	@GetMapping("/email")
	public ResponseEntity<Boolean> sendEmail(){

		//		EmailService email = new EmailService();
		//		email.sendEmail("roundrobintfg@gmail.com", "roundrobintfg@gmail.com", "Prueba", "Body del mensaje de prueba");
		//		

		//EmailService emailSender = new EmailService("roundrobintfg@gmail.com", "Prueba");
		//EmailSender emailSender = new EmailService();
		emailService.sendSimpleEmail("roundrobintfg@gmail.com", "Concepto", "Esto es el Body del mensaje de prueba");

		return ResponseEntity.ok(true);
	}


	@GetMapping("/{name}/measures/{measureName}/measurements/{measurementName}/results")
	public ResponseEntity<ResultGraph> getResults (@PathVariable String name, @PathVariable String measureName, @PathVariable String measurementName){
		//TODO:
		//Check if the experiment exists
		Experiment e = experimentService.experimentByName(name);
		if (e == null)
			return ResponseEntity.notFound().build();

		//check if there are any measures for the given exp.
		List<Measure> measures = e.getMeasures();
		if (measures == null)
			return ResponseEntity.notFound().build();
		//check if given exp has a measure with given name
		Measure m = measurementService.findMeasure(measures, measureName);
		if(m == null) {
			return ResponseEntity.notFound().build();
		}

		//check if there is any measurement for the given measure.
		List<Measurement> measurements = m.getMeasurements();
		if (measurements == null)
			return ResponseEntity.notFound().build();
		//check if given measure has a measurement with given name
		Measurement me = measurementService.findMeasurement(measurements, measurementName);
		if(me == null) {
			return ResponseEntity.notFound().build();
		}

		List<Result> results = me.getResults();
		if (results == null)
			return ResponseEntity.notFound().build();


		List <ResultGraphItem> values = new ArrayList<ResultGraphItem>();

		//Now i have to go over the file with the results and add them to the 'values' list 
		for(Result r: results) {
			System.out.println("Hola. ");
		}

		//this 4 lines (add) are only to try the comunication with redcharts front library
		values.add(new ResultGraphItem(3, 5));
		values.add(new ResultGraphItem(5, 7));
		values.add(new ResultGraphItem(7, 10));
		values.add(new ResultGraphItem(9, 3));
		values.add(new ResultGraphItem(11, 1));
		values.add(new ResultGraphItem(13, 1));
		values.add(new ResultGraphItem(15, 1));
		values.add(new ResultGraphItem(17, 15));
		values.add(new ResultGraphItem(50, 50));

		ResultGraph response = new ResultGraph("Raman", "Intensity", values);
		return ResponseEntity.ok(response);
	}


}
