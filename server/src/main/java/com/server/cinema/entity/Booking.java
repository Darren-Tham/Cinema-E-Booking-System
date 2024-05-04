package com.server.cinema.entity;

import java.util.List;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Column(columnDefinition = "DATETIME", nullable = false)
    private String dateTime;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "booking")
    private List<Ticket> tickets;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "booking_seat", joinColumns = @JoinColumn(name = "booking_id"))
    @Column(name = "seat", nullable = false)
    private Set<String> seats;

    @Column(columnDefinition = "DECIMAL(5,2)", nullable = false)
    private double total;

    @Column(nullable = false)
    private String cardType;

    @Column(columnDefinition = "DATE", nullable = false)
    private String expirationDate;

    @Column(nullable = false)
    private String billingAddress;

    @Column(nullable = false)
    private String lastFourDigits;

    @Column(nullable = false)
    private String bookingDate;
}
