package com.server.cinema.database.promotion;

import java.util.Set;

import com.server.cinema.database.booking.Booking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column(nullable = false)
    private int discountPercentage;

    @Column(nullable = false)
    private String discountCode;

    @Column(columnDefinition = "DATE", nullable = false)
    private String startDate;

    @Column(columnDefinition = "DATE", nullable = false)
    private String endDate;

    @OneToMany(mappedBy = "promotion")
    private Set<Booking> bookings;

}
