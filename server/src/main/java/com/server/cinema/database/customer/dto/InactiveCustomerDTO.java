package com.server.cinema.database.customer.dto;

public record InactiveCustomerDTO(
        String firstName,
        String lastName,
        String email,
        String password,
        String phoneNumber,
        boolean isSubscribedForPromotions) {
}
