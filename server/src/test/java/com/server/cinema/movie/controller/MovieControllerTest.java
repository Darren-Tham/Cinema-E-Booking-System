package com.server.cinema.movie.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.server.cinema.movie.entity.Movie;
import com.server.cinema.movie.service.MovieService;

@ExtendWith(MockitoExtension.class)
final class MovieControllerTest {

    @Mock
    private MovieService movieService;
    private MovieController movieController;

    @BeforeEach
    private void setUp() {
        movieController = new MovieController(movieService);
    }

    @Test
    void testAddMovie() {
        final Movie movie = new Movie();
        movie.setMovieName(anyString());

        ResponseEntity<String> result = movieController.addMovie(movie);

        verify(movieService).addMovie(movie);
        ResponseEntity<String> expected = new ResponseEntity<>("Movie has been successfully added.",
                HttpStatus.CREATED);
        assertEquals(expected, result,
                "The response entity returned by the addMovie method does not equal the expected response entity.");
    }

    @Test
    void testGetMovieById() {
        final int id = anyInt();
        movieController.getMovieById(id);
        verify(movieService).getMovieById(id);
    }

    @Test
    void testGetAllMovies() {
        movieController.getMovies();
        verify(movieService).getAllMovies();
    }

    @Test
    void testSearchMovies() {
        final String query = anyString();
        movieController.searchMovies(query);
        verify(movieService).searchMovies(query);
    }

}
