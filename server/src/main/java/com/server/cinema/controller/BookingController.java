package com.server.cinema.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.dto.CheckoutBookingDTO;
import com.server.cinema.dto.ProfileBookingDTO;
import com.server.cinema.service.BookingService;

@CrossOrigin
@RestController
@RequestMapping("api/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(final BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/{bookingId}")
    public ProfileBookingDTO getBookingById(@PathVariable final int bookingId) {
        return bookingService.getBookingById(bookingId);
    }

    @GetMapping("/customer/{customerId}")
    public List<ProfileBookingDTO> getCustomerBookings(@PathVariable final int customerId) {
        return bookingService.getCustomerBookings(customerId);
    }

    @PostMapping("/add")
    public int addBooking(@RequestBody final CheckoutBookingDTO checkoutBookingDTO) {
        return bookingService.addBooking(checkoutBookingDTO);
    }

}
