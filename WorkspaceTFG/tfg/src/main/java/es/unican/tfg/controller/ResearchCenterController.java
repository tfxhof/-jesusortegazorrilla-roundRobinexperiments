package es.unican.tfg.controller;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.google.common.hash.Hashing;

import es.unican.tfg.DTOs.ExperimentDTO;
import es.unican.tfg.DTOs.ResearchCenterDTO;
import es.unican.tfg.email.EmailService;
import es.unican.tfg.model.EmailCode;
import es.unican.tfg.model.Experiment;
import es.unican.tfg.model.ResearchCenter;
import es.unican.tfg.service.EmailCodeService;
import es.unican.tfg.service.ExperimentService;
import es.unican.tfg.service.ResearchCenterService;

@RestController
@RequestMapping("/centers")
@CrossOrigin
public class ResearchCenterController {

	@Autowired
	private ResearchCenterService centerService;

	@Autowired
	private EmailCodeService emailCodeService;

	@Autowired
	private EmailService emailService;


	/**
	 * Get the list of experiments for a center
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@GetMapping({"/{email}/experiments"})
	public ResponseEntity<List<ExperimentDTO>> getExperimentsFromCenter(
			@RequestParam(value="creator", required=true) boolean creator,
			@PathVariable String email) {

		List<Experiment> experiments = null;
		experiments = centerService.experiments(email, creator);

		if(experiments == null)
			return ResponseEntity.notFound().build();

		List<ExperimentDTO> exp = new ArrayList<ExperimentDTO>();
		for(Experiment e: experiments) {
			exp.add(new ExperimentDTO(e));
		}
		//Maybe error management needed but not yet
		return ResponseEntity.ok(exp);
	}


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
	@GetMapping("/{email}/{password}")
	public ResponseEntity<ResearchCenterDTO> getOne(@PathVariable String email, @PathVariable String password) throws InterruptedException, ExecutionException {
		System.out.println(email);
		System.out.println(password);
		ResearchCenter r = centerService.researchCenterByEmail(email);
		if (r == null)
			return ResponseEntity.notFound().build();

		//Check if password matches
		if (centerService.checkPassword(password, r.getPassword())) {
			return ResponseEntity.ok(new ResearchCenterDTO(r));
		} else {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}
	
	/**
	 * Get a research Center or 404 if does not exist
	 * @param id
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@GetMapping("/{email}")
	public ResponseEntity<ResearchCenterDTO> getOne(@PathVariable String email) throws InterruptedException, ExecutionException {
		ResearchCenter r = centerService.researchCenterByEmail(email);
		if (r == null)
			return ResponseEntity.notFound().build();
		ResearchCenterDTO rc = new ResearchCenterDTO(r);
		return ResponseEntity.ok(rc);
	}



	/**
	 * Method to create a research Center (Unknown id so POST instead of PUT)
	 * @param exp
	 * @return
	 * @throws InterruptedException
	 * @throws ExecutionException
	 */
	@PostMapping
	public ResponseEntity<ResearchCenterDTO> registerSendEmail(@RequestBody ResearchCenter r) throws InterruptedException, ExecutionException {
		//hash the password
		String sha256hex = Hashing.sha256()
				.hashString(r.getPassword(), StandardCharsets.UTF_8)
				.toString();
		r.setPassword(sha256hex);

		//Send email with *the link to accept invitation*
		//Generate the code
		EmailCode ec = new EmailCode(r.getEmail(), "registration");
		//Save the code in DB
		emailCodeService.createEmailCode(ec);
		System.out.println("Codigo: " + ec.getCode());
		r.setName(r.getName().replaceAll(" ", "%20"));
		r.getContactInfo().setAddress(r.getContactInfo().getAddress().replaceAll(" ", "%20"));
		r.getContactInfo().setCity(r.getContactInfo().getCity().replaceAll(" ", "%20"));
		r.getContactInfo().setCountry(r.getContactInfo().getCountry().replaceAll(" ", "%20"));
		r.getContactInfo().setDutyManagerName(r.getContactInfo().getDutyManagerName().replaceAll(" ", "%20"));

		String link = "http://localhost:3000/ConfirmRegistration"
				+ "?centerEmail=" + r.getEmail() 
				+ "&expName=registration"
				+ "&code=" + ec.getCode()
				+ "&password=" + sha256hex
				+ "&name=" + r.getName()
				+ "&address=" + r.getContactInfo().getAddress()
				+ "&city=" + r.getContactInfo().getCity()
				+ "&country=" + r.getContactInfo().getCountry()
				+ "&dutyManagerName=" + r.getContactInfo().getDutyManagerName();

		emailService.sendSimpleEmail(
				r.getEmail(), 
				"Link to registrate in Round Robin Experiments.", 
				"Click this link below to complete the registration:" + "\n\n" + link);

		return ResponseEntity.ok(new ResearchCenterDTO(r));

	}


	@PostMapping("/{email}/confirm")
	public ResponseEntity<ResearchCenterDTO> registerConfirmEmail (@PathVariable String email, 
			@RequestBody ResearchCenter r, 
			@RequestParam(value="code", required=true) String code){

		List<EmailCode> codes = emailCodeService.findByCenterEmail(email);
		for (EmailCode ec: codes) {
			if(ec.getCode().equals(code) && ec.getExpName().equals("registration")) {
				//If the code matches
				emailCodeService.deleteEmailCode(ec.getId());
				ResearchCenter rc = centerService.createResearchCenter(r);
				if (rc == null) {
					return ResponseEntity.status(HttpStatus.CONFLICT).build();
				}
				URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
				return ResponseEntity.created(location).body(new ResearchCenterDTO(rc));
			}
		}//for

		return ResponseEntity.status(HttpStatus.CONFLICT).build();
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





}
