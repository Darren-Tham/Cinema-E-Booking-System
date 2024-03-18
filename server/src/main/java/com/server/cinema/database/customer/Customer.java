package com.server.cinema.database.customer;

import com.server.cinema.database.customer.enums.UserState;
import com.server.cinema.database.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Column(nullable = false, updatable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private UserState status;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

}
