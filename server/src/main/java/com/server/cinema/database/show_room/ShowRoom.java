package com.server.cinema.database.show_room;

import java.util.Set;

import com.server.cinema.database.cinema.Cinema;
import com.server.cinema.database.movie.Movie;
import com.server.cinema.database.show_time.ShowTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class ShowRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column(nullable = false)
    private int seatCapacity;

    @OneToMany(mappedBy = "showRoom")
    private Set<ShowTime> showTimes;

    @ManyToMany(mappedBy = "showRooms")
    private Set<Movie> movies;

    @ManyToOne
    @JoinColumn(name = "cinema_name", nullable = false)
    private Cinema cinema;

}
