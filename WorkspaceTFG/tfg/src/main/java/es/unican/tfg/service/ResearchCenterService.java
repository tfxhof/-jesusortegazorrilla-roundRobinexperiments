package es.unican.tfg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.unican.tfg.model.ResearchCenter;
import es.unican.tfg.repository.ResearchCenterRepository;

@Service
public class ResearchCenterService implements IResearchCenterService{	

	@Autowired
	private ResearchCenterRepository centerRepository;


	public List<ResearchCenter> researchCenters() {
		return centerRepository.findAll();
	}

	public ResearchCenter researchCenterById(long id) {
		return centerRepository.findById(id).orElse(null);
	}

	public ResearchCenter createResearchCenter(ResearchCenter r) {	
		if (centerRepository.findByName(r.getName()) == null)//if null it creates the experiment
			return centerRepository.save(r);
		return null;
	}

	public ResearchCenter modifyResearchCenter(ResearchCenter r) {
		if (centerRepository.findById(r.getId()) == null)//if null it return null
			return null;
		return centerRepository.save(r);
	}

	public ResearchCenter deleteResearchCenter(Long id) {
		ResearchCenter e = centerRepository.findById(id).orElse(null);
		if (e == null)
			return null;
		centerRepository.deleteById(e.getId());
		return e;
	}



}
