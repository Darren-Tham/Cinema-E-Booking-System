package com.server.cinema.dto;

public record CustomerCardDTO(
        int customerId,
        String cardType,
        String cardNumber,
        String expirationDate,
        String billingAddress) {
}
