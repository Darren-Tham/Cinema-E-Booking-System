package com.server.cinema.database.card.dto;

public record CardDTOCustomerId(
        int customerId,
        String cardType,
        String cardNumber,
        String expirationDate,
        String billingAddress) {
}
