package com.server.cinema.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(final JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(final EmailDTO email) {
        final SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email.receiverEmail());
        message.setSubject(email.subject());
        message.setText(email.text());
        javaMailSender.send(message);
    }
}
