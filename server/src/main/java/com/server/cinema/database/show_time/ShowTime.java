package com.server.cinema.database.show_time;

import java.util.Set;

import com.server.cinema.database.booking.Booking;
import com.server.cinema.database.movie.Movie;
import com.server.cinema.database.show_room.ShowRoom;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ShowTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Column(columnDefinition = "DATETIME", nullable = false)
    private String dateTime;

    @Column(nullable = false)
    private int durationInMinutes;

    @OneToMany(mappedBy = "showTime")
    private Set<Booking> bookings;

    @ManyToOne
    @JoinColumn(name = "show_room_id", nullable = false)
    private ShowRoom showRoom;

}
