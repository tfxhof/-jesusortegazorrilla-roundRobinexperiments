package es.unican.tfg.email;

import java.io.File;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

//import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


@Service
public class EmailService implements EmailSender{


	@Autowired
	private JavaMailSender emailSender;

	@Override
	public void sendSimpleEmail(String from, String to, String subject, String emailBody) {

		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(from);
		message.setTo(to);
		message.setSubject(subject);
		message.setText(emailBody);
		emailSender.send(message);
	}


	@Override
	public void sendEmail(String from, String to, String subject, String emailBody) throws MessagingException {
		
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		helper.setFrom(from);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(emailBody);

		emailSender.send(message);

	}
	
	@Override
	public void sendEmailWithAttachment(String from, String to, String subject, String emailBody, String pathToAttachment) throws MessagingException {
		
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		helper.setFrom(from);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(emailBody);

		FileSystemResource file 
		= new FileSystemResource(new File(pathToAttachment));
		helper.addAttachment("Invoice", file);

		emailSender.send(message);

	}

}
