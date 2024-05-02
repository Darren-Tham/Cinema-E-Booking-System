package com.server.cinema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    protected int id;

    @Column(nullable = false)
    protected String encryptedPassword;

    protected User() {
    }

    protected User(final String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

}
