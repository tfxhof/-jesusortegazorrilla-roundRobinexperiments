package es.unican.tfg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.unican.tfg.model.Experiment;


public interface ExperimentRepository extends JpaRepository<Experiment, Long>{
	
	public Experiment findByName(String name);
	
}
