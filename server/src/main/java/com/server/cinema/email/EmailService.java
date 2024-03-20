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
        final String subject = String.format("Cinema E-Booking System Email Verification Code: %s",
                email.verificationCode());
        final String text = String.format("In order to activate your account, please enter the verification code: %s.",
                email.verificationCode());
        message.setTo(email.receiverEmail());
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }

}
