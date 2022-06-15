package es.unican.tfg.email;

import javax.mail.MessagingException;

public interface EmailSender {

	public void sendSimpleEmail (String to, String subject, String email);
	
	public void sendEmail(String to, String subject, String emailBody) throws MessagingException;
	
	public void sendEmailWithAttachment(String to, String subject, String emailBody, String pathToAttachment) throws MessagingException;

}
