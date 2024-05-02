package com.server.cinema.dto;

public record NewCustomerDTO(
        String firstName,
        String lastName,
        String email,
        String password,
        String phoneNumber,
        boolean isSubscribedForPromotions) {
}
