package com.server.cinema.database.verification_code;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/verification_code")
public class VerificationCodeController {

    private final VerificationCodeService verificationCodeService;

    @Autowired
    public VerificationCodeController(final VerificationCodeService verificationCodeService) {
        this.verificationCodeService = verificationCodeService;
    }

    @GetMapping("/{customerId}")
    public String getVerificationCode(@PathVariable final int customerId) {
        return verificationCodeService.getVerificationCode(customerId);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addVerificationCode(@RequestBody final VerificationCodeDTO verificationCode) {
        verificationCodeService.addVerificationCode(verificationCode);
        return ResponseEntity.ok("Verification code has been set.");
    }

}
