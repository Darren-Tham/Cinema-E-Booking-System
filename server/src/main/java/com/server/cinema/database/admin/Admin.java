package com.server.cinema.database.admin;

import com.server.cinema.database.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Admin extends User {

    @Column(nullable = false, updatable = false, unique = true)
    private String username;

    public Admin(final String username, final String encryptedPassword) {
        super(encryptedPassword);
        this.username = username;
    }

}
