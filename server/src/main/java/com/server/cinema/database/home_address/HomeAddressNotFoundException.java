package com.server.cinema.database.home_address;

public class HomeAddressNotFoundException extends RuntimeException {
    public HomeAddressNotFoundException(final String msg) {
        super(msg);
    }
}
