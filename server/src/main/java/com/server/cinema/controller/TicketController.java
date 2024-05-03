package com.server.cinema.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.dto.TicketDTO;
import com.server.cinema.service.TicketService;

@CrossOrigin
@RestController
@RequestMapping("api/tickets")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(final TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/booking/{bookingId}")
    public List<TicketDTO> getTicketsByBookingId(@PathVariable final int bookingId) {
        return ticketService.getTicketsByBookingId(bookingId);
    }

}
