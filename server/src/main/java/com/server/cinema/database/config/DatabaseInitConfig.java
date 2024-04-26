package com.server.cinema.database.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.server.cinema.util.interfaces.InitRunnable;

@Configuration
class DatabaseInitConfig {

    private final List<InitRunnable> runnables;

    @Autowired
    DatabaseInitConfig(
            @Qualifier("movieDataManager") final InitRunnable movieRunnable,
            @Qualifier("producerDataManager") final InitRunnable producerRunnable,
            @Qualifier("directorDataManager") final InitRunnable directorRunnable,
            @Qualifier("castMemberDataManager") final InitRunnable castMemberRunnable,
            @Qualifier("reviewDataManager") final InitRunnable reviewRunnable,
            @Qualifier("movieProducerDataManager") final InitRunnable movieProducerRunnable,
            @Qualifier("movieDirectorDataManager") final InitRunnable movieDirectorRunnable,
            @Qualifier("movieCastMemberDataManager") final InitRunnable movieCastMemberRunnable,
            @Qualifier("customerDataManager") final InitRunnable customerDataManager,
            @Qualifier("adminDataManager") final InitRunnable adminDataManager,
            @Qualifier("showTimeDataManager") final InitRunnable showTimeDataManager) {
        this.runnables = List.of(
                movieRunnable,
                producerRunnable,
                directorRunnable,
                castMemberRunnable,
                reviewRunnable,
                movieProducerRunnable,
                movieDirectorRunnable,
                movieCastMemberRunnable,
                customerDataManager,
                adminDataManager,
                showTimeDataManager);
    }

    @Bean
    CommandLineRunner commandLineRunner() {
        return (final String... args) -> runnables.forEach(InitRunnable::init);
    }
}
