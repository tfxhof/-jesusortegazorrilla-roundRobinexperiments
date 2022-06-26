package es.unican.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import es.unican.tfg.model.EmailCode;
import es.unican.tfg.model.EmailCodeKey;

public interface EmailCodeRepository extends JpaRepository<EmailCode, Long>{

	public List<EmailCode> findByCenterEmail(String centerEmail);
	
}
