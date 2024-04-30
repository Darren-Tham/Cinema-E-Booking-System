package com.server.cinema.database.home_address.dto;

public record ProfileHomeAddressDTO(
        int id,
        String address,
        String city,
        String state,
        String zipcode) {
}
