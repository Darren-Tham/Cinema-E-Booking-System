package com.server.cinema.movie.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.server.cinema.movie.entity.Movie;
import com.server.cinema.movie.repository.MovieRepository;

@ExtendWith(MockitoExtension.class)
final class MovieDAOJPATest {

    @Mock
    private MovieRepository movieRepository;
    private MovieDAO movieDAO;

    @BeforeEach
    private void setUp() {
        movieDAO = new MovieDAOJPA(movieRepository);
    }

    @Test
    void testAddMovie() {
        final Movie movie = new Movie();
        movie.setMovieName("Movie Title");
        movieDAO.addMovie(movie);

        ArgumentCaptor<Movie> movieArgumentCaptor = ArgumentCaptor.forClass(Movie.class);
        verify(movieRepository).save(movieArgumentCaptor.capture());

        Movie capturedMovie = movieArgumentCaptor.getValue();
        assertEquals(movie, capturedMovie,
                "The movie captured from the database is not the same movie added to the database.");
    }

    @Test
    void testSelectAllMovies() {
        movieDAO.selectAllMovies();
        verify(movieRepository).findAll();
    }

    @Test
    void testSelectMovieByIdExists() {
        final int movieId = 1;
        final Movie movie = new Movie();
        movie.setMovieId(movieId);
        movie.setMovieName("Movie Title");
        final Optional<Movie> expected = Optional.of(movie);

        when(movieRepository.findById(movieId)).thenReturn(expected);
        final Optional<Movie> result = movieDAO.selectMovieById(movieId);
        assertEquals(expected, result,
                "The movie returned by selectMovieById method does not match the expected movie.");
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

        when(movieRepository.findByMovieNameLike(searchQuery)).thenReturn(expected);
        final List<Movie> result = movieDAO.searchMovies(searchQuery);
        assertIterableEquals(expected, result, "The list of movies returned by searchMovies does not match the expected list.");
    }
}
