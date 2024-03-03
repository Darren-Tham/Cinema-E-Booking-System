package com.server.cinema.movie.dao;

import java.util.List;
import java.util.Optional;

import com.server.cinema.movie.entity.Movie;

public interface MovieDAO {

    void addMovie(final Movie movie);

    Optional<Movie> selectMovieById(final int movieId);

    List<Movie> selectAllMovies();

    List<Movie> searchMovies(final String searchQuery);

}
