package es.unican.tfg.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.ExecutionException;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import es.unican.tfg.DTOs.MeasurementDTO;
import es.unican.tfg.DTOs.ResultGraph;
import es.unican.tfg.DTOs.ResultGraphItem;
import es.unican.tfg.model.Instrument;
import es.unican.tfg.model.Measurement;
import es.unican.tfg.model.Parameter;
import es.unican.tfg.model.Result;
import es.unican.tfg.model.ResultFile;
import es.unican.tfg.service.MeasurementService;
import es.unican.tfg.service.ResultFileService;

@RestController
@RequestMapping("/measurements")
@CrossOrigin
public class MeasurementController implements IMeasurementController{

	@Autowired
	private MeasurementService measurementService;

	@Autowired
	private ResultFileService resultFileService;


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

	//	@GetMapping("/{id}/results")
	//	public ResponseEntity<List<Result>> getAllResults(Long id) {
	//		Measurement measurement = measurementService.findById(id);
	//		if (measurement == null || measurement.getResults() == null) {
	//			return ResponseEntity.notFound().build();
	//		}
	//		return ResponseEntity.ok(measurement.getResults());
	//	}

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

	/**
	 * Store the file(byte[]) and fileName in the database
	 * @param file
	 * @return
	 */
	@PostMapping("/resultfiles")
	public ResponseEntity<Long> addResultFile(@RequestParam("file") MultipartFile file){
		try {
			ResultFile r = resultFileService.store(file);
			return ResponseEntity.ok(r.getId());
			//return ResponseEntity.status(HttpStatus.OK).build();

		} catch (Exception e) {
			System.out.println("He fallado");
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
		}
	}


	@PostMapping("/{name}/results")
	public ResponseEntity<MeasurementDTO> addResult(@PathVariable String name, @RequestBody Result r){

		ResultFile rf = resultFileService.findById(r.getFileId());
		r.setFile(rf);

		//Check if the measurement exists in the database
		Measurement m = measurementService.findByName(name);
		if (m == null) {
			return ResponseEntity.notFound().build();
		}


		//To set if the result was successful or not
		if (r.getSuccessful().equals("yes")) {
			r.setSatisfactory(true);
		} else 
			r.setSatisfactory(false);


		//Dont need this SYSO, it is to try to see the uploaded file
		System.out.println("Result Name: " + r.getName());
		System.out.println("Result Comments: " + r.getComments());
		System.out.println("Result Successful: " + r.isSatisfactory());
		System.out.println("Result File Name: " + r.getFile().getName());

		//Esta en cascade pero igual hay que añadir el resultado a la BBDD antes

		m.getResults().add(r);
		measurementService.modifyMeasurement(m);

		return ResponseEntity.ok(new MeasurementDTO(m));
	}


	//For the moment it return only 1 result but will have to return more
	@GetMapping("/{name}/results")
	public ResponseEntity<ResultGraph> getResult(@PathVariable String name/*, @PathVariable long id*/) throws IOException {

		Measurement m = measurementService.findByName(name);
		if (m == null) {
			return ResponseEntity.notFound().build();
		}

		List<Result> results = m.getResults();
		if (results == null)
			return ResponseEntity.notFound().build();

		ResultFile file = resultFileService.getFile(2); //Change this 2 for 'id'

		File tmpFile = File.createTempFile("temp", ".csv");
		String absolutePath = tmpFile.getAbsolutePath();
		System.out.println("File path: " + absolutePath);

		//To write the byte[] to the tmp file
		try (FileOutputStream fileOuputStream = new FileOutputStream(tmpFile)){
			fileOuputStream.write(file.getData());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//To read the file and generate a ResultGraph which contains the values to draw the graphic
		ResultGraph rg = measurementService.csvReader(absolutePath);

		return ResponseEntity.ok(rg);
	}




	@GetMapping("/test")
	public String getHolaMundo() {
		return "Hola Mundo!";
	}

}
