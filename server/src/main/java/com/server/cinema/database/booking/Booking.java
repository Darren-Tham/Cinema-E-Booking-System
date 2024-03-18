package com.server.cinema.database.booking;

import java.util.Set;

import com.server.cinema.database.promotion.Promotion;
import com.server.cinema.database.showtime.ShowTime;
import com.server.cinema.database.ticket.Ticket;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @Column(columnDefinition = "DATETIME", nullable = false)
    private String dateTime;

    @Column(nullable = false)
    private int numberOfTickets;

    @Column(columnDefinition = "DECIMAL(5,2)", nullable = false)
    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @OneToMany(mappedBy = "booking")
    private Set<Ticket> tickets;

    @ManyToOne
    @JoinColumn(name = "show_time_id", nullable = false)
    private ShowTime showTime;

}
