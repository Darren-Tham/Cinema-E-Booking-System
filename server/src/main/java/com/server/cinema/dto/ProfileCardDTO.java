package com.server.cinema.dto;

public record ProfileCardDTO(int id, String cardType, String expirationDate,
        String billingAddress, String lastFourDigits) {
}
