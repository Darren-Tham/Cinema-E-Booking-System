package com.server.cinema.entity;

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

@NoArgsConstructor
@Data
@Entity
public class Showtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Column(columnDefinition = "DATETIME", nullable = false)
    private String dateTime;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "movie_seat", joinColumns = @JoinColumn(name = "showtime_id"))
    @Column(name = "label", nullable = false)
    private Set<String> unavailableSeats;

    @OneToMany(mappedBy = "showTime")
    private Set<Booking> bookings;

    @ManyToOne
    @JoinColumn(name = "show_room_id")
    private ShowRoom showRoom;

}
