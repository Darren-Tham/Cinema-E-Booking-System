package com.server.cinema.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.cinema.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findAllByCustomerId(final int customerId);
}
