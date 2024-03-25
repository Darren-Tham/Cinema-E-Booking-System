package com.server.cinema.database.card.dto;

public record CardDTONoId(String cardType, String expirationDate,
        String billingAddress, String lastFourDigits) {
}
