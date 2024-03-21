package com.server.cinema.database.movie;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.movie.dao.MovieDAO;

@Service
public class MovieService {

    private final MovieDAO movieDAO;

    @Autowired
    public MovieService(final MovieDAO movieDAO) {
        this.movieDAO = movieDAO;
    }

    public void addMovie(final Movie movie) {
        movieDAO.addMovie(movie);
    }

    public MovieDTO getMovieById(final int id) {
        return movieDAO
                .selectMovieById(id)
                .map(Movie::toDTO)
                .orElseThrow(() -> new MovieNotFoundException(String.format("Movie with id %d does not exist.", id)));
    }

    public List<MovieDTO> getAllMovies() {
        return movieDAO
                .selectAllMovies()
                .stream()
                .map(Movie::toDTO)
                .collect(Collectors.toList());
    }

    public List<MovieDTO> searchMovies(final String searchQuery) {
        return movieDAO
                .searchMovies(searchQuery)
                .stream()
                .map(Movie::toDTO)
                .collect(Collectors.toList());
    }
}
