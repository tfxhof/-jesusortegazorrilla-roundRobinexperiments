package es.unican.tfg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.unican.tfg.model.Sample;

public interface SampleRepository extends JpaRepository<Sample, Long>{

	public Sample findByCode(String code);
}
