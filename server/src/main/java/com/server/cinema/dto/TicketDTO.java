package com.server.cinema.dto;

import com.server.cinema.enums.TicketType;

public record TicketDTO(
        int ticketId,
        double price,
        TicketType ticketType) {
}
