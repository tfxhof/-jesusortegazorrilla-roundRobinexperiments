package es.unican.tfg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unican.tfg.model.EmailCode;
import es.unican.tfg.model.Experiment;
import es.unican.tfg.repository.EmailCodeRepository;

@Service
public class EmailCodeService {

	
	@Autowired
	private EmailCodeRepository emailCodeRepository;
	
	
	/**
	 * find the List <EmailCodes> by the given center email
	 * @param email
	 * @param expName
	 * @return
	 */
	public List<EmailCode> findByCenterEmail(String email) {
		List<EmailCode> list = emailCodeRepository.findByCenterEmail(email);
		return list;
	}
	
	
	public EmailCode createEmailCode(EmailCode ec) {
		return emailCodeRepository.save(ec);
	}
	
	public EmailCode deleteEmailCode(Long id) {
		EmailCode ec = emailCodeRepository.findById(id).orElse(null);
		if (ec == null)
			return null;
		emailCodeRepository.deleteById(ec.getId());
		return ec;
	}
	
	
	
	
}
