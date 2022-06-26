package es.unican.tfg.model;

import java.util.Random;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Transient;

@Entity
public class EmailCode {

	@Transient
	static final int CODE_LENGTH = 64;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String centerEmail;

	private String expName;

	@Column(unique=true)
	private String code;


	public EmailCode() {}
	
	/**
	 * @param centerEmailId
	 * @param expNameId
	 * @param code
	 */
	public EmailCode(String centerEmail, String expName) {
		super();
		this.centerEmail = centerEmail;
		this.expName = expName;

		//Generate random code
		Random rand=new Random();
		String possibleLetters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";   
		StringBuilder sb = new StringBuilder(CODE_LENGTH);
		for(int i = 0; i < CODE_LENGTH; i++) {
			sb.append(possibleLetters.charAt(rand.nextInt(possibleLetters.length())));
		}

		this.code = sb.toString();
	}


	
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCenterEmail() {
		return centerEmail;
	}

	public void setCenterEmail(String centerEmail) {
		this.centerEmail = centerEmail;
	}

	public String getExpName() {
		return expName;
	}

	public void setExpName(String expName) {
		this.expName = expName;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}



}
