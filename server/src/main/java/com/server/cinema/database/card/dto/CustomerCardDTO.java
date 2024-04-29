package com.server.cinema.database.card.dto;

public record CustomerCardDTO(
        int customerId,
        String cardType,
        String cardNumber,
        String expirationDate,
        String billingAddress) {
}
