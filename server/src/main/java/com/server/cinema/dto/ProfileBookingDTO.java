package com.server.cinema.dto;

import java.util.Set;

public record ProfileBookingDTO(
        int bookingId,
        String movieTitle,
        String movieImageLink,
        String dateTime,
        Set<String> seats,
        double total,
        String cardType,
        String expirationDate,
        String billingAddress,
        String lastFourDigits,
        String bookingDate) {
}
