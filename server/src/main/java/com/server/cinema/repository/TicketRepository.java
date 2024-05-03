package com.server.cinema.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.cinema.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findAllByBookingId(final int bookingId);
}
