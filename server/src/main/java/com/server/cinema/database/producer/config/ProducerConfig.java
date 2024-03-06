package com.server.cinema.database.producer.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.server.cinema.database.producer.entity.Producer;
import com.server.cinema.database.producer.repository.ProducerRepository;
import com.server.cinema.util.DataCollectors;

@Configuration
class ProducerConfig {

    private final DataCollectors dataCollectors;

    @Autowired
    ProducerConfig(final DataCollectors dataCollectors) {
        this.dataCollectors = dataCollectors;
    }

    @Bean
    CommandLineRunner producerCommandLineRunner(final ProducerRepository producerRepository) {
        final List<Producer> producers = dataCollectors.getData("producer_data.json", Producer.class);
        return (final String... args) -> producerRepository.saveAll(producers);
    }
}
