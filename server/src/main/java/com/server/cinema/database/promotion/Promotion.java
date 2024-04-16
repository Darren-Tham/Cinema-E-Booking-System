package com.server.cinema.database.promotion;

import java.util.Set;

import com.server.cinema.database.booking.Booking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
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
    private String name;

    @Column(nullable = false)
    private String discountCode;

    @Column(nullable = false)
    private int discountPercentage;

    @Column(columnDefinition = "DATE", nullable = false)
    private String startDate;

    @Column(columnDefinition = "DATE", nullable = false)
    private String endDate;

    @OneToMany(mappedBy = "promotion")
    private Set<Booking> bookings;

    public Promotion(final String name, final String discountCode, final int discountPercentage,
            final String startDate, final String endDate) {
        this.name = name;
        this.discountCode = discountCode;
        this.discountPercentage = discountPercentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
