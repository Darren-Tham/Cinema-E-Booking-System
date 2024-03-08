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
    private final InitRunnable castMemberRunnable;
    private final InitRunnable movieProducerRunnable;
    private final InitRunnable movieDirectorRunnable;
    private final InitRunnable movieCastMemberRunnable;

    @Autowired
    DatabaseInitConfig(
            @Qualifier("movieDataManager") final InitRunnable movieRunnable,
            @Qualifier("producerDataManager") final InitRunnable producerRunnable,
            @Qualifier("directorDataManager") final InitRunnable directorRunnable,
            @Qualifier("castMemberDataManager") final InitRunnable castMemberRunnable,
            @Qualifier("movieProducerDataManager") final InitRunnable movieProducerRunnable,
            @Qualifier("movieDirectorDataManager") final InitRunnable movieDirectorRunnable,
            @Qualifier("movieCastMemberDataManager") final InitRunnable movieCastMemberRunnable) {
        this.movieRunnable = movieRunnable;
        this.producerRunnable = producerRunnable;
        this.directorRunnable = directorRunnable;
        this.castMemberRunnable = castMemberRunnable;
        this.movieProducerRunnable = movieProducerRunnable;
        this.movieDirectorRunnable = movieDirectorRunnable;
        this.movieCastMemberRunnable = movieCastMemberRunnable;
    }

    @Bean
    CommandLineRunner commandLineRunner() {
        return (final String... args) -> initDatabase();
    }

    private void initDatabase() {
        movieRunnable.init();
        producerRunnable.init();
        directorRunnable.init();
        castMemberRunnable.init();
        movieProducerRunnable.init();
        movieDirectorRunnable.init();
        movieCastMemberRunnable.init();
    }
}
