package es.unican.tfg.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 * Results about one test
 * @author Jesus
 *
 */
@Entity
public class Result {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String comments;
	private boolean satisfactory;
	
	
	//private blob? file;
//	@Lob
//	@Basic(fetch = FetchType.LAZY)
//	@Column(columnDefinition = "BLOB", nullable = false)
//	private byte[] files;


	//Empty constructor
	public Result() {}

	/**
	 * @param name
	 * @param comments
	 * @param satisfactory
	 */
	public Result(String name, String comments, boolean satisfactory) {
		super();
		this.name = name;
		this.comments = comments;
		this.satisfactory = satisfactory;
	}





	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public boolean isSatisfactory() {
		return satisfactory;
	}

	public void setSatisfactory(boolean satisfactory) {
		this.satisfactory = satisfactory;
	}

}
