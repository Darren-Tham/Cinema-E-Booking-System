package com.server.cinema.database.customer;

import java.util.Set;

import com.server.cinema.database.card.Card;
import com.server.cinema.database.customer.enums.UserState;
import com.server.cinema.database.home_address.HomeAddress;
import com.server.cinema.database.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Customer extends User {

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private UserState status;

    @Column(nullable = false)
    private boolean isSubscribedForPromotions;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private Set<Card> cards;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private HomeAddress homeAddress;

    public Customer(
            final String firstName,
            final String lastName,
            final String email,
            final String encryptedPassword,
            final String phoneNumber,
            final UserState status,
            final boolean isSubscribedForPromotions) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.encryptedPassword = encryptedPassword;
        this.phoneNumber = phoneNumber;
        this.status = status;
        this.isSubscribedForPromotions = isSubscribedForPromotions;
    }

}
