package es.unican.tfg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.unican.tfg.model.Parameter;

public interface ParameterRepository extends JpaRepository<Parameter, Long>{

}
