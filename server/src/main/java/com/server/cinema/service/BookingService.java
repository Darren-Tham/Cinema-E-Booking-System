package com.server.cinema.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.CheckoutBookingDTO;
import com.server.cinema.dto.ProfileBookingDTO;
import com.server.cinema.entity.Booking;
import com.server.cinema.entity.Customer;
import com.server.cinema.entity.Movie;
import com.server.cinema.entity.Showtime;
import com.server.cinema.entity.Ticket;
import com.server.cinema.enums.TicketType;
import com.server.cinema.repository.BookingRepository;
import com.server.cinema.repository.CustomerRepository;
import com.server.cinema.repository.MovieRepository;
import com.server.cinema.repository.ShowtimeRepository;
import com.server.cinema.repository.TicketRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final MovieRepository movieRepository;
    private final CustomerRepository customerRepository;
    private final ShowtimeRepository showtimeRepository;
    private final TicketRepository ticketRepository;

    @Autowired
    public BookingService(
            final BookingRepository bookingRepository,
            final MovieRepository movieRepository,
            final CustomerRepository customerRepository,
            final ShowtimeRepository showtimeRepository,
            final TicketRepository ticketRepository) {
        this.bookingRepository = bookingRepository;
        this.movieRepository = movieRepository;
        this.customerRepository = customerRepository;
        this.showtimeRepository = showtimeRepository;
        this.ticketRepository = ticketRepository;
    }

    public ProfileBookingDTO getBookingById(final int bookingId) {
        return bookingRepository.findById(bookingId).map(BookingService::toProfileBookingDTO).orElseThrow();
    }

    public List<ProfileBookingDTO> getCustomerBookings(final int customerId) {
        return bookingRepository
                .findAllByCustomerId(customerId)
                .stream()
                .map(BookingService::toProfileBookingDTO)
                .collect(Collectors.toList());
    }

    private static String getTodayDate() {
        final LocalDateTime todayDate = LocalDateTime.now();
        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return todayDate.format(formatter);
    }

    private static List<Ticket> getTickets(final CheckoutBookingDTO checkoutBookingDTO, final Movie movie,
            final Booking booking) {
        final List<Ticket> tickets = new ArrayList<>();
        tickets
                .addAll(Stream.generate(() -> {
                    final Ticket ticket = new Ticket();
                    ticket.setPrice(movie.getAdultTicketPrice());
                    ticket.setTicketType(TicketType.ADULT);
                    ticket.setBooking(booking);
                    return ticket;
                })
                        .limit(checkoutBookingDTO.adultTicketCount())
                        .collect(Collectors.toList()));
        tickets
                .addAll(Stream.generate(() -> {
                    final Ticket ticket = new Ticket();
                    ticket.setPrice(movie.getChildTicketPrice());
                    ticket.setTicketType(TicketType.CHILD);
                    ticket.setBooking(booking);
                    return ticket;
                })
                        .limit(checkoutBookingDTO.childTicketCount())
                        .collect(Collectors.toList()));
        tickets
                .addAll(Stream.generate(() -> {
                    final Ticket ticket = new Ticket();
                    ticket.setPrice(movie.getSeniorTicketPrice());
                    ticket.setTicketType(TicketType.SENIOR);
                    ticket.setBooking(booking);
                    return ticket;
                })
                        .limit(checkoutBookingDTO.seniorTicketCount())
                        .collect(Collectors.toList()));
        return tickets;
    }

    public int addBooking(final CheckoutBookingDTO checkoutBookingDTO) {
        final Booking booking = new Booking();

        final Movie movie = movieRepository
                .findById(checkoutBookingDTO.movieId())
                .orElseThrow();
        final Customer customer = customerRepository
                .findById(checkoutBookingDTO.customerId())
                .orElseThrow();
        final Showtime showtime = showtimeRepository
                .findById(checkoutBookingDTO.showtimeId())
                .orElseThrow();
        final List<Ticket> tickets = getTickets(checkoutBookingDTO, movie, booking);

        booking.setMovie(movie);
        booking.setCustomer(customer);
        booking.setShowtime(showtime);
        booking.setTickets(tickets);
        booking.setSeats(checkoutBookingDTO.seats());
        booking.setTotal(checkoutBookingDTO.total());
        booking.setCardType(checkoutBookingDTO.cardType());
        booking.setExpirationDate(checkoutBookingDTO.expirationDate());
        booking.setBillingAddress(checkoutBookingDTO.billingAddress());
        booking.setLastFourDigits(checkoutBookingDTO.lastFourDigits());
        booking.setBookingDate(getTodayDate());

        final int bookingId = bookingRepository.save(booking).getId();
        ticketRepository.saveAll(tickets);
        return bookingId;
    }

    private static ProfileBookingDTO toProfileBookingDTO(final Booking booking) {
        final Movie movie = booking.getMovie();
        return new ProfileBookingDTO(
                booking.getId(),
                movie.getTitle(),
                movie.getImageLink(),
                booking.getShowtime().getDateTime(),
                booking.getSeats(),
                booking.getTotal(),
                booking.getCardType(),
                booking.getExpirationDate(),
                booking.getBillingAddress(),
                booking.getLastFourDigits(),
                booking.getBookingDate());
    }

}
