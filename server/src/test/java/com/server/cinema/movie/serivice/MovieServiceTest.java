package com.server.cinema.movie.serivice;

import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.mockito.Mockito;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.server.cinema.database.movie.Movie;
import com.server.cinema.database.movie.MovieDTO;
import com.server.cinema.database.movie.MovieService;
import com.server.cinema.database.movie.dao.MovieDAO;
import com.server.cinema.database.movie.exception.MovieNotFoundException;

@ExtendWith(MockitoExtension.class)
final class MovieServiceTest {

    @Mock
    private MovieDAO movieDAO;
    private MovieService movieService;

    @BeforeEach
    private void setUp() {
        movieService = new MovieService(movieDAO);
    }

    @Test
    void testAddMovie() {
        final Movie movie = new Movie();
        movieService.addMovie(movie);

        ArgumentCaptor<Movie> movieArgumentCaptor = ArgumentCaptor.forClass(Movie.class);
        Mockito.verify(movieDAO).addMovie(movieArgumentCaptor.capture());
        final Movie capturedMovie = movieArgumentCaptor.getValue();
        Assertions.assertEquals(movie, capturedMovie, "The movie captured is not the same movie being added.");
    }

    @Test
    void testGetMovieByIdExists() {
        final int id = ArgumentMatchers.anyInt();
        final Movie movie = new Movie();

        Mockito.when(movieDAO.selectMovieById(id)).thenReturn(Optional.of(movie));

        final MovieDTO result = movieService.getMovieById(id);
        Mockito.verify(movieDAO).selectMovieById(id);
        Assertions.assertEquals(movie.toDTO(), result,
                "The movie returned by getMovieById method does not match the expected movie.");
    }

    @Test
    void testGetMovieByIdNotExist() {
        final int id = ArgumentMatchers.anyInt();
        Mockito.when(movieDAO.selectMovieById(id)).thenReturn(Optional.empty());
        Assertions.assertThrows(MovieNotFoundException.class, () -> movieService.getMovieById(id),
                "Expected MovieNotFoundException was not thrown.");
    }

    @Test
    void testGetAllMovies() {
        movieService.getAllMovies();
        Mockito.verify(movieDAO).selectAllMovies();
    }

    @Test
    void testSearchMovies() {
        final String query = ArgumentMatchers.anyString();
        movieService.searchMovies(query);
        Mockito.verify(movieDAO).searchMovies(query);
    }
}
