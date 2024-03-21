package com.server.cinema.database.customer.exception;

public class LoginCredentialsInvalidException extends RuntimeException {
    public LoginCredentialsInvalidException(final String msg) {
        super(msg);
    }
}
