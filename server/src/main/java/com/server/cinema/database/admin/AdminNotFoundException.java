package com.server.cinema.database.admin;

public class AdminNotFoundException extends RuntimeException {
    public AdminNotFoundException(final String msg) {
        super(msg);
    }
}
