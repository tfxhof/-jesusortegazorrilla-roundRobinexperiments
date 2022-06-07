package es.unican.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import es.unican.tfg.model.ResearchCenter;

public interface ResearchCenterRepository extends JpaRepository<ResearchCenter, Long>{
	
	public ResearchCenter findByName(String name);
	
	//If I want to search by an attribute of an embedded class I concat the names of the attributess. This should work, via: stackoverflow.
	public List<ResearchCenter> findByContactInfoCountry(String country);
	
	//public ResearchCenter findByEmail(String email);
	
}
