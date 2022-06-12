package es.unican.tfg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.unican.tfg.model.Measurement;


public interface MeasurementRepository extends JpaRepository<Measurement, Long>{
	
	public Measurement findByName(String name);
	
}
