package com.server.cinema.dto;

public record ProfileHomeAddressDTO(
        int id,
        String address,
        String city,
        String state,
        String zipcode) {
}
