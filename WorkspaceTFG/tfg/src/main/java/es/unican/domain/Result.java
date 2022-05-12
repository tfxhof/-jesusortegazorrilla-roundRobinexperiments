package es.unican.domain;

/**
 * Results about one test
 * @author Jesus
 *
 */
public class Result {

	private String name;
	
	private String comments;
	
	private boolean satisfactory;
	
	//private blob? file;

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
