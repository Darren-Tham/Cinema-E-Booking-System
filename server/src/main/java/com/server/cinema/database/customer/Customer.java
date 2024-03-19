package com.server.cinema.database.customer;

import java.util.Set;

import com.server.cinema.database.card.Card;
import com.server.cinema.database.customer.enums.UserState;
import com.server.cinema.database.home_address.HomeAddress;
import com.server.cinema.database.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
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

    @Enumerated(EnumType.STRING)
    private UserState status;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, updatable = false)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    @OneToMany(mappedBy = "customer")
    private Set<Card> cards;

    @OneToOne(mappedBy = "customer")
    private HomeAddress homeAddress;

}
