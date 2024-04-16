package com.server.cinema.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.email.dto.EmailProfileDTO;
import com.server.cinema.email.dto.EmailVerificationCodeDTO;

@CrossOrigin
@RestController
@RequestMapping("api/email")
public class EmailController {

    private final EmailService emailService;

    @Autowired
    public EmailController(final EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/profile")
    public ResponseEntity<String> profileEmail(@RequestBody final EmailProfileDTO email) {
        emailService.sendProfileEmail(email);
        return ResponseEntity.ok("Email has been sent successfully.");
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody final EmailVerificationCodeDTO email) {
        emailService.sendEmail(email);
        return ResponseEntity.ok("Email has been sent successfully.");
    }

}
