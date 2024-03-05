package com.server.cinema.movie.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.cinema.movie.entity.Movie;
import com.server.cinema.movie.repository.MovieRepository;

@Configuration
class MovieConfig {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private final ResourceLoader resourceLoader;

    @Autowired
    MovieConfig(final ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Bean
    CommandLineRunner commandLineRunner(final MovieRepository movieRepository) {
        return (final String... args) -> movieRepository.saveAll(getMovies());
    }

    private final List<Movie> getMovies() {
        try {
            InputStream inputStream = resourceLoader.getResource("classpath:data/movie_data.json").getInputStream();
            return OBJECT_MAPPER.readValue(inputStream, new TypeReference<List<Movie>>() {
            });
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
