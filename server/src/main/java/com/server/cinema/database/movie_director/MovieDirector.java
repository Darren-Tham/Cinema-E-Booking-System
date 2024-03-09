package com.server.cinema.database.movie_director;

import com.server.cinema.database.director.Director;
import com.server.cinema.database.movie.Movie;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MovieDirector {

    @EmbeddedId
    private MovieDirectorId id;

    @ManyToOne
    @MapsId("movieId")
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @MapsId("directorId")
    @JoinColumn(name = "director_id")
    private Director director;

}
