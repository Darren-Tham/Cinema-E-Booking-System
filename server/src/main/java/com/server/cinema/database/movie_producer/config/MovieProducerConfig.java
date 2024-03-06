package com.server.cinema.database.movie_producer.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.server.cinema.database.movie_producer.entity.MovieProducer;
import com.server.cinema.database.movie_producer.repository.MovieProducerRepository;
import com.server.cinema.util.DataCollectors;

@Configuration
class MovieProducerConfig {

    private final DataCollectors dataCollectors;

    @Autowired
    MovieProducerConfig(final DataCollectors dataCollectors) {
        this.dataCollectors = dataCollectors;
    }

    @Bean
    CommandLineRunner movieProducerCommandLineRunner(final MovieProducerRepository movieProducerRepository) {
        final List<MovieProducer> movieProducers = dataCollectors.getMovieProducers();
        return (final String... args) -> movieProducerRepository.saveAll(movieProducers);
    }

}