package com.server.cinema.database.movie.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.movie.Movie;
import com.server.cinema.database.movie.MovieRepository;

@Repository
public class MovieDAOJPA implements MovieDAO {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieDAOJPA(final MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public void addMovie(final Movie movie) {
        movieRepository.save(movie);
    }

    @Override
    public Optional<Movie> selectMovieById(final int movieId) {
        return movieRepository.findById(movieId);
    }

    @Override
    public List<Movie> selectAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public List<Movie> searchMovies(String searchQuery) {
        return movieRepository.findByMovieNameLike(searchQuery);
    }
}
