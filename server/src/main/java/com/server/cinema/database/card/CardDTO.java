package com.server.cinema.database.card;

public record CardDTO(int customerId, String cardType, String cardNumber, String expirationDate,
        String billingAddress) {
}
