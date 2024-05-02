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

import com.server.cinema.database.movie.Movie;
import com.server.cinema.database.movie.MovieRepository;
import com.server.cinema.database.movie.dao.MovieDAO;
import com.server.cinema.database.movie.dao.MovieDAOJPA;

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
        movieDAO.addMovie(movie);

        ArgumentCaptor<Movie> movieArgumentCaptor = ArgumentCaptor.forClass(Movie.class);
        Mockito.verify(movieRepository).save(movieArgumentCaptor.capture());
        final Movie capturedMovie = movieArgumentCaptor.getValue();
        Assertions.assertEquals(movie, capturedMovie,
                "The movie captured from the database is not the same movie added to the database.");
    }

    @Test
    void testSelectAllMovies() {
        movieDAO.selectAllMovies();
        Mockito.verify(movieRepository).findAll();
    }

    @Test
    void testSelectMovieByIdExists() {
        final int id = ArgumentMatchers.anyInt();
        movieDAO.selectMovieById(id);
        Mockito.verify(movieRepository).findById(id);
    }

    @Test
    void testSearchMovies() {
        final String searchQuery = ArgumentMatchers.anyString();
        movieDAO.searchMovies(searchQuery);
        Mockito.verify(movieRepository).findByMovieNameLike(searchQuery);
    }
}
