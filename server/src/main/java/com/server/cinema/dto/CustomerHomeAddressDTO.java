package com.server.cinema.dto;

public record CustomerHomeAddressDTO(
        int customerId,
        String address,
        String city,
        String state,
        String zipcode) {
}
