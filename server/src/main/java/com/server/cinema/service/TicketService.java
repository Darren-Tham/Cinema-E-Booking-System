package com.server.cinema.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.TicketDTO;
import com.server.cinema.entity.Ticket;
import com.server.cinema.repository.TicketRepository;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketService(final TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketDTO> getTicketsByBookingId(final int bookingId) {
        return ticketRepository
                .findAllByBookingId(bookingId)
                .stream()
                .map((final Ticket ticket) -> new TicketDTO(ticket.getId(), ticket.getPrice(), ticket.getTicketType()))
                .collect(Collectors.toList());
    }

}
