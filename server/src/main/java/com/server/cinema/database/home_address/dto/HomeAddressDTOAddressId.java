package com.server.cinema.database.home_address.dto;

public record HomeAddressDTOAddressId(
        int id,
        String address,
        String city,
        String state,
        String zipcode) {
}
