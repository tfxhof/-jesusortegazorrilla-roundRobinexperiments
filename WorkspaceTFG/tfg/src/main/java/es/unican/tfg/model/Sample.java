package es.unican.tfg.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 
 * @author Jesus
 *
 */
@Entity
public class Sample {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="material_name")
	private String material;
	
	private String composition;
	private String code;
	private String description;

	
	//Empty constructor
	public Sample() {}
	
	/**
	 * @param material
	 * @param composition
	 * @param code
	 * @param description
	 */
	public Sample(String material, String composition, String code, String description) {
		super();
		this.material = material;
		this.composition = composition;
		this.code = code;
		this.description = description;
	}

	
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMaterial() {
		return material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public String getComposition() {
		return composition;
	}

	public void setComposition(String composition) {
		this.composition = composition;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
