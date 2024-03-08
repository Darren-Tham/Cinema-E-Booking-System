package com.server.cinema.database.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.server.cinema.util.interfaces.InitRunnable;

@Configuration
class DatabaseInitConfig {

    private final InitRunnable movieRunnable;
    private final InitRunnable producerRunnable;
    private final InitRunnable directorRunnable;
    private final InitRunnable movieProducerRunnable;
    private final InitRunnable movieDirectorRunnable;

    @Autowired
    DatabaseInitConfig(
            @Qualifier("movieDataManager") final InitRunnable movieRunnable,
            @Qualifier("producerDataManager") final InitRunnable producerRunnable,
            @Qualifier("directorDataManager") final InitRunnable directorRunnable,
            @Qualifier("movieProducerDataManager") final InitRunnable movieProducerRunnable,
            @Qualifier("movieDirectorDataManager") final InitRunnable movieDirectorRunnable) {
        this.movieRunnable = movieRunnable;
        this.producerRunnable = producerRunnable;
        this.directorRunnable = directorRunnable;
        this.movieProducerRunnable = movieProducerRunnable;
        this.movieDirectorRunnable = movieDirectorRunnable;
    }

    @Bean
    CommandLineRunner commandLineRunner() {
        return (final String... args) -> initDatabase();
    }

    private final void initDatabase() {
        movieRunnable.init();
        producerRunnable.init();
        directorRunnable.init();
        movieProducerRunnable.init();
        movieDirectorRunnable.init();
    }
}
