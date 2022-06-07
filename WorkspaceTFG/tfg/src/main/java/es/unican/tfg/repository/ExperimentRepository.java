package es.unican.tfg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import es.unican.tfg.model.Experiment;
import es.unican.tfg.model.ResearchCenter;


public interface ExperimentRepository extends JpaRepository<Experiment, Long>{
	
	public Experiment findByName(String name);
	
	public List<Experiment> findByCreator(ResearchCenter rc);
	
	//public List<Experiment> findByParticipantsId(Long id);

	public List<Experiment> findByParticipants(ResearchCenter rc);
	
}
