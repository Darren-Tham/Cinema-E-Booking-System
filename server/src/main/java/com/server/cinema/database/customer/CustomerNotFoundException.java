package com.server.cinema.database.customer;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(final String msg) {
        super(msg);
    }
}
