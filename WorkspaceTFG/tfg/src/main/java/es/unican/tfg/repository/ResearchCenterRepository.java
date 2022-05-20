package es.unican.tfg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.unican.tfg.model.ResearchCenter;

public interface ResearchCenterRepository extends JpaRepository<ResearchCenter, Long>{
	
	public ResearchCenter findByName(String name);
	
}
