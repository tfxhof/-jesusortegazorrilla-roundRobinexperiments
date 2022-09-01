package es.unican.tfg.tfg;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import es.unican.tfg.controller.ExperimentController;
import es.unican.tfg.model.ContactData;
import es.unican.tfg.model.Experiment;
import es.unican.tfg.model.Instrument;
import es.unican.tfg.model.Measure;
import es.unican.tfg.model.Measurement;
import es.unican.tfg.model.Parameter;
import es.unican.tfg.model.ResearchCenter;
import es.unican.tfg.model.Result;
import es.unican.tfg.model.Sample;
import es.unican.tfg.service.ExperimentService;
import es.unican.tfg.service.MeasurementService;
import es.unican.tfg.service.ResearchCenterService;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


@AutoConfigureMockMvc
@SpringBootTest
//@WebMvcTest(ExperimentController.class)
public class TfgApplicationTests {


	@Autowired
	private MockMvc mockMvc;


	@Autowired
	private ObjectMapper objectMapper;

	//@MockBean
	//private ResearchCenterService centerService;

	@Mock
	private ResearchCenterService rcService;

	@Mock
	private ExperimentService experimentService;

	@Mock
	private MeasurementService measurementService;

	/**
	 * UT.1a
	 * @throws JsonProcessingException
	 * @throws Exception
	 */
	@Test
	void addMeasurementCorrectTest() throws JsonProcessingException, Exception {

		//Creacion de objetos
		ResearchCenter researchCenter = new ResearchCenter(null, "uc@gmail.com", null, null);
		Experiment experiment = new Experiment("Resistencia del Carbono", 
				"Se quiere probar cual es la maxima resistencia que soporta el carbono bajo diferentes situaciones", 
				researchCenter, null, null, null);

		Measurement measurement = new Measurement(researchCenter, null, null, null, null, null);

		//Preparacion de las respuestas de los mocks
		when(rcService.researchCenterByEmail("uc@gmail.com")).thenReturn(researchCenter);
		when(experimentService.experimentByName("Resistencia del Carbono")).thenReturn(experiment);
		when(measurementService.createMeasurement(measurement, measurement.getName())).thenReturn(measurement);

		//Llamada al metodo bajo prueba
		mockMvc.perform(
				MockMvcRequestBuilders.post("/experiments/Resistencia del Carbono/measures/Dureza del Carbono/measurements")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(measurement)))
		.andExpect(status().isOk());
	}


	/**
	 * UT.1b
	 * @throws JsonProcessingException
	 * @throws Exception
	 */
	@Test
	void addMeasurementNotExistingCenterTest() throws JsonProcessingException, Exception {

		Measurement measurement = new Measurement(new ResearchCenter(null, "noExistente@gmail.com", null, null), null, null, null, null, null);

		//Preparacion de las respuestas de los mocks
		when(rcService.researchCenterByEmail("noExistente@gmail.com")).thenReturn(null);		

		//Llamada al metodo bajo prueba
		mockMvc.perform(
				MockMvcRequestBuilders.post("/Resistencia del Carbono/measures/Dureza del Carbono/measurements")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(measurement)))
		.andExpect(status().isNotFound());
	}



	/**
	 * UT.1c
	 */
	@Test
	void addMeasurementNotExistingExperimentTest() throws JsonProcessingException, Exception {

		//Creacion de objetos
		ResearchCenter researchCenter = new ResearchCenter(null, "uc@gmail.com", null, null);
		Measurement measurement = new Measurement(researchCenter, null, null, null, null, null);


		//Preparacion de las respuestas de los mocks
		when(rcService.researchCenterByEmail("uc@gmail.com")).thenReturn(researchCenter);
		when(experimentService.experimentByName("Resistencia del Carbono")).thenReturn(null);

		//Llamada al metodo bajo prueba
		mockMvc.perform(
				MockMvcRequestBuilders.post("/Experimento no existente/measures/Dureza del Carbono/measurements")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(measurement)))
		.andExpect(status().isNotFound());

	}



	/**
	 * UT.1d
	 */
	@Test
	void addMeasurementNotExistingMeasureTest() throws JsonProcessingException, Exception {

		//Creacion de objetos
		ResearchCenter researchCenter = new ResearchCenter(null, "uc@gmail.com", null, null);
		Measurement measurement = new Measurement(researchCenter, null, null, null, null, null);
		Experiment experiment = new Experiment("Resistencia del Carbono", 
				"Se quiere probar cual es la maxima resistencia que soporta el carbono bajo diferentes situaciones", 
				researchCenter, null, null, null);

		//Preparacion de las respuestas de los mocks
		when(rcService.researchCenterByEmail("uc@gmail.com")).thenReturn(researchCenter);
		when(experimentService.experimentByName("Resistencia del Carbono")).thenReturn(experiment);
		when(measurementService.createMeasurement(measurement, measurement.getName())).thenReturn(null);

		//Llamada al metodo bajo prueba
		mockMvc.perform(
				MockMvcRequestBuilders.post("/Resistencia del Carbono/measures/Measure no existente/measurements")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(measurement)))
		.andExpect(status().isNotFound());

	}






	/**
	 * UT.1e
	 */
	@Test
	void addMeasurementAlreadyExistingTest() throws JsonProcessingException, Exception {

		//Creacion de objetos
		ResearchCenter researchCenter = new ResearchCenter(null, "atlantico@gmail.com", null, null);
		Experiment experiment = new Experiment("Resistencia del Carbono", 
				"Se quiere probar cual es la maxima resistencia que soporta el carbono bajo diferentes situaciones", 
				researchCenter, null, null, null);
		Measurement measurement = new Measurement(new ResearchCenter(null, "atlantico@gmail.com", null, null), null, null, null, null, null);

		//Preparacion de las respuestas de los mocks
		when(rcService.researchCenterByEmail("atlantico@gmail.com")).thenReturn(researchCenter);
		when(experimentService.experimentByName("Resistencia del Carbono")).thenReturn(experiment);
		when(measurementService.createMeasurement(measurement, measurement.getName())).thenReturn(measurement);


		//Llamada al metodo bajo prueba
		mockMvc.perform(
				MockMvcRequestBuilders.post("/experiments/Resistencia del Carbono/measures/Dureza del Carbono/measurements")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(measurement)))
		.andExpect(status().isConflict());

	}


}
