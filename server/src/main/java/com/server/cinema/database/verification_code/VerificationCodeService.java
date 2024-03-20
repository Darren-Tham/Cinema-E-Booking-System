package com.server.cinema.database.verification_code;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.customer.Customer;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class VerificationCodeService {

    private final EntityManager entityManager;

    @Autowired
    public VerificationCodeService(final EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public String getVerificationCode(final int customerId) {
        Customer customer = entityManager.find(Customer.class, customerId);
        return customer.getVerificationCode().getCode();
    }

    @Transactional
    public void addVerificationCode(final VerificationCodeDTO verificationCodeDTO) {
        Customer customer = entityManager.find(Customer.class, verificationCodeDTO.customerId());
        VerificationCode verificationCode = new VerificationCode(verificationCodeDTO.code(), customer);
        customer.setVerificationCode(verificationCode);
    }

}
