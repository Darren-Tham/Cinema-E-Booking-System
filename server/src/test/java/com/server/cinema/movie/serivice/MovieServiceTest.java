package com.server.cinema.movie.serivice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.server.cinema.movie.dao.MovieDAO;
import com.server.cinema.movie.entity.Movie;
import com.server.cinema.movie.exception.MovieNotFoundException;
import com.server.cinema.movie.service.MovieService;

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
        movie.setMovieName("Movie Title");
        movieService.addMovie(movie);
        verify(movieDAO).addMovie(movie);
    }

    @Test
    void testGetMovieByIdExists() {
        final int movieId = 1;
        final Movie movie = new Movie();
        movie.setMovieId(movieId);
        when(movieDAO.selectMovieById(movieId)).thenReturn(Optional.of(movie));

        final Movie result = movieService.getMovieById(movieId);
        assertEquals(movie, result, "The movie returned by getMovieById method does not match the expected movie.");
    }

    @Test
    void testGetMovieByIdNotExist() {
        final int movieId = 1;
        when(movieDAO.selectMovieById(movieId)).thenReturn(Optional.empty());

        assertThrows(MovieNotFoundException.class, () -> movieService.getMovieById(movieId),
                "Expected MovieNotFoundException was not thrown.");
    }

    @Test
    void testGetAllMovies() {
        movieService.getAllMovies();
        verify(movieDAO).selectAllMovies();
    }

    @Test
    void testSearchMovies() {
        final String searchQuery = "itl";
        final Movie movie1 = new Movie();
        movie1.setMovieName("Movie Title");
        final Movie movie2 = new Movie();
        movie2.setMovieName("Title of the Movie");
        final Movie movie3 = new Movie();
        movie3.setMovieName("Little Movie");
        final Movie movie4 = new Movie();
        movie4.setMovieName("TITLE of the Movie");
        final Movie movie5 = new Movie();
        movie5.setMovieName("TiTle of the Movie");
        final List<Movie> expected = List.of(movie1, movie2);

        when(movieDAO.searchMovies(searchQuery)).thenReturn(expected);
        final List<Movie> result = movieService.searchMovies(searchQuery);
        assertIterableEquals(expected, result,
                "The list of movies returned by searchMovies does not match the expected list.");
    }
}
