package com.server.cinema.database.seat;

import com.server.cinema.database.ticket.Ticket;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE", nullable = false)
    private boolean isAvailable;

    @OneToOne(mappedBy = "seat")
    private Ticket ticket;

}
