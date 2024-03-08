package com.server.cinema.database.config;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.server.cinema.database.director.repository.DirectorRepository;
import com.server.cinema.database.movie.repository.MovieRepository;
import com.server.cinema.database.movie_director.repository.MovieDirectorRepository;
import com.server.cinema.database.movie_producer.repository.MovieProducerRepository;
import com.server.cinema.database.producer.repository.ProducerRepository;
import com.server.cinema.util.DataCollector;

@Configuration
class DatabaseInitConfig {

    private static final String CLASS_NAME = DatabaseInitConfig.class.getName();
    private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
    private final DataCollector dataCollector;
    private final MovieRepository movieRepository;
    private final ProducerRepository producerRepository;
    private final DirectorRepository directorRepository;
    private final MovieProducerRepository movieProducerRepository;
    private final MovieDirectorRepository movieDirectorRepository;

    @Autowired
    DatabaseInitConfig(
            final DataCollector dataCollector,
            final MovieRepository movieRepository,
            final ProducerRepository producerRepository,
            final DirectorRepository directorRepository,
            final MovieProducerRepository movieProducerRepository,
            final MovieDirectorRepository movieDirectorRepository) {
        this.dataCollector = dataCollector;
        this.movieRepository = movieRepository;
        this.producerRepository = producerRepository;
        this.directorRepository = directorRepository;
        this.movieProducerRepository = movieProducerRepository;
        this.movieDirectorRepository = movieDirectorRepository;
    }

    @Bean
    CommandLineRunner commandLineRunner() {
        return (final String... args) -> initDatabase();
    }

    private final void initDatabase() {
        initMovieTable();
        initProducerTable();
        initDirectorTable();
        initMovieProducerTable();
        initMovieDirectorTable();
    }

    private final void initMovieTable() {
        movieRepository.saveAll(dataCollector.getMovies());
        logTableInitialized("movie");
    }

    private final void initProducerTable() {
        producerRepository.saveAll(dataCollector.getProducers());
        logTableInitialized("producer");
    }

    private final void initDirectorTable() {
        directorRepository.saveAll(dataCollector.getDirectors());
        logTableInitialized("director");
    }

    private final void initMovieProducerTable() {
        movieProducerRepository.saveAll(dataCollector.getMovieProducers());
        logTableInitialized("movie_producer");
    }

    private final void initMovieDirectorTable() {
        movieDirectorRepository.saveAll(dataCollector.getMovieDirectors());
        logTableInitialized("movie_director");
    }

    private static final void logTableInitialized(final String tableName) {
        final String message = String.format("\"%s\" table initialized.", tableName);
        LOGGER.info(message);
    }

}
