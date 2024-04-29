package com.server.cinema.database.card.dto;

public record ProfileCardDTO(int id, String cardType, String expirationDate,
        String billingAddress, String lastFourDigits) {
}
