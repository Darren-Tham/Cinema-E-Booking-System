package com.server.cinema.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.server.cinema.config.interfaces.InitRunnable;

@Configuration
class DatabaseInitConfig {

    private final List<InitRunnable> runnables;

    @Autowired
    DatabaseInitConfig(
            @Qualifier("movieDataManager") final InitRunnable movieRunnable,
            @Qualifier("reviewDataManager") final InitRunnable reviewRunnable,
            @Qualifier("customerDataManager") final InitRunnable customerDataManager,
            @Qualifier("adminDataManager") final InitRunnable adminDataManager,
            @Qualifier("showtimeDataManager") final InitRunnable showTimeDataManager) {
        this.runnables = List.of(
                movieRunnable,
                reviewRunnable,
                customerDataManager,
                adminDataManager,
                showTimeDataManager);
    }

    @Bean
    CommandLineRunner commandLineRunner() {
        return (final String... args) -> runnables.forEach(InitRunnable::init);
    }
}
