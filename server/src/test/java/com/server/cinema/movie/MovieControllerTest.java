package com.server.cinema.movie;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.server.cinema.database.movie.Movie;
import com.server.cinema.database.movie.MovieController;
import com.server.cinema.database.movie.MovieService;

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
        ResponseEntity<String> resultResponseEntity = movieController.addMovie(movie);

        ArgumentCaptor<Movie> movieArgumentCaptor = ArgumentCaptor.forClass(Movie.class);
        Mockito.verify(movieService).addMovie(movieArgumentCaptor.capture());
        final Movie capturedMovie = movieArgumentCaptor.getValue();
        Assertions.assertEquals(movie, capturedMovie, "The movie captured is not the same movie being added.");

        ResponseEntity<String> expectedResponseEntity = new ResponseEntity<>("Movie has been successfully added.",
                HttpStatus.CREATED);
        Assertions.assertEquals(expectedResponseEntity, resultResponseEntity,
                "The response entity returned by the addMovie method does not equal the expected response entity.");
    }

    @Test
    void testGetMovieById() {
        final int id = ArgumentMatchers.anyInt();
        movieController.getMovieById(id);
        Mockito.verify(movieService).getMovieById(id);
    }

    @Test
    void testGetAllMovies() {
        movieController.getAllMovies();
        Mockito.verify(movieService).getAllMovies();
    }

    @Test
    void testSearchMovies() {
        final String query = ArgumentMatchers.anyString();
        movieController.searchMovies(query);
        Mockito.verify(movieService).searchMovies(query);
    }

}
