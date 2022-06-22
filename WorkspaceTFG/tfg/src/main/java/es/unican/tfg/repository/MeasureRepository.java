package es.unican.tfg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.unican.tfg.model.Measure;

public interface MeasureRepository extends JpaRepository<Measure, Long>{

	public Measure findByName(String name);
	
}
