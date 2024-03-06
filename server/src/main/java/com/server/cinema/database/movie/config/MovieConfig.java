package com.server.cinema.database.movie.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.server.cinema.database.movie.entity.Movie;
import com.server.cinema.database.movie.repository.MovieRepository;
import com.server.cinema.util.DataCollectors;

@Configuration
class MovieConfig {

    private final DataCollectors dataCollectors;

    @Autowired
    MovieConfig(final DataCollectors dataCollectors) {
        this.dataCollectors = dataCollectors;
    }

    @Bean
    CommandLineRunner movieCommandLineRunner(final MovieRepository movieRepository) {
        final List<Movie> movies = dataCollectors.getMovies();
        return (final String... args) -> movieRepository.saveAll(movies);
    }

}
