package com.server.cinema.database.card;

import com.server.cinema.database.customer.Customer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column(nullable = false)
    private String cardType;

    @Column(nullable = false)
    private String encryptedCardNumber;

    @Column(columnDefinition = "DATE", nullable = false)
    private String expirationDate;

    @Column(nullable = false)
    private String billingAddress;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    public Card(
            final String cardType,
            final String encryptedCardNumber,
            final String expirationDate,
            final String billingAddress,
            final Customer customer) {
        this.cardType = cardType;
        this.encryptedCardNumber = encryptedCardNumber;
        this.expirationDate = expirationDate;
        this.billingAddress = billingAddress;
        this.customer = customer;
    }

}
