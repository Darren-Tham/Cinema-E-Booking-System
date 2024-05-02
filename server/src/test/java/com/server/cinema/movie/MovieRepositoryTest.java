package com.server.cinema.movie;

import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.server.cinema.database.movie.Movie;
import com.server.cinema.database.movie.MovieRepository;

@DataJpaTest
final class MovieRepositoryTest {

    private final MovieRepository movieRepository;

    @Autowired
    private MovieRepositoryTest(final MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @AfterEach
    private void tearDown() {
        movieRepository.deleteAll();
    }

    @Test
    void testFindByMovieNameLikeExists() {
        final Movie movie = new Movie();
        movie.setTitle("Movie Title");
        movieRepository.save(movie);

        List<Movie> result = movieRepository.findByMovieNameLike("itl");
        Assertions.assertIterableEquals(List.of(movie), result,
                "Failed finding a movie with its name containing \"itl\".");
    }

    @Test
    void testMultipleFindByMovieNameLikeExists() {
        final Movie movie1 = new Movie();
        movie1.setTitle("Movie Title");
        final Movie movie2 = new Movie();
        movie2.setTitle("Title of the Movie");
        final Movie movie3 = new Movie();
        movie3.setTitle("Little Movie");
        final Movie movie4 = new Movie();
        movie4.setTitle("TITLE of the Movie");
        final Movie movie5 = new Movie();
        movie5.setTitle("TiTle of the Movie");
        movieRepository.saveAll(List.of(movie1, movie2, movie3, movie4, movie5));

        List<Movie> result = movieRepository.findByMovieNameLike("itl");
        Assertions.assertIterableEquals(List.of(movie1, movie2), result,
                "Failed finding two movies with their names containing \"itl\".");
    }

    @Test
    void testFindByMovieNameLikeNotExist() {
        final Movie movie1 = new Movie();
        movie1.setTitle("Movie Title");
        final Movie movie2 = new Movie();
        movie2.setTitle("Title of the Movie");
        final Movie movie3 = new Movie();
        movie3.setTitle("Little Movie");
        movieRepository.saveAll(List.of(movie1, movie2, movie3));

        List<Movie> result = movieRepository.findByMovieNameLike("move");
        Assertions.assertTrue(result.isEmpty(), "Expected no movies to contain \"move\" in their names.");
    }

}
