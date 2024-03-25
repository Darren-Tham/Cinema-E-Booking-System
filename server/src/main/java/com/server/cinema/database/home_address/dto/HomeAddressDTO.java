package com.server.cinema.database.home_address.dto;

public record HomeAddressDTO(
        int customerId,
        String address,
        String city,
        String state,
        String zipcode) {
}
