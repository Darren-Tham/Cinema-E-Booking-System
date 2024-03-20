package com.server.cinema.database.verification_code;

import com.server.cinema.database.customer.Customer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class VerificationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column(nullable = false)
    private String code;

    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    public VerificationCode(final String code, final Customer customer) {
        this.code = code;
        this.customer = customer;
    }

}
