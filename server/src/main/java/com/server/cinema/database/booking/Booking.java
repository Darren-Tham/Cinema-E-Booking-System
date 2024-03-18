package com.server.cinema.database.booking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

}
