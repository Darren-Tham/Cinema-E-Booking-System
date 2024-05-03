package com.server.cinema.dto;

import java.util.Set;

public record CheckoutBookingDTO(
        int movieId,
        int customerId,
        int showtimeId,
        int adultTicketCount,
        int childTicketCount,
        int seniorTicketCount,
        Set<String> seats,
        double total,
        String cardType,
        String expirationDate,
        String billingAddress,
        String lastFourDigits,
        String bookingDate) {
}
