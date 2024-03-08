package com.server.cinema.util;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.database.producer.Producer;
import com.server.cinema.database.producer.ProducerRepository;
import com.server.cinema.util.interfaces.InitRunnable;
import com.server.cinema.util.interfaces.MapSupplier;

@Component
public final class ProducerDataManager extends DataManager implements MapSupplier<Producer>, InitRunnable {

    private final ProducerRepository producerRepository;

    @Autowired
    private ProducerDataManager(final ResourceLoader resourceLoader, final ProducerRepository producerRepository) {
        super(resourceLoader);
        this.producerRepository = producerRepository;
    }

    @Override
    public void init() {
        producerRepository.saveAll(getProducers());
    }

    @Override
    public Map<Integer, Producer> getMap() {
        return map(this::getProducers, Producer::getId);
    }

    private List<Producer> getProducers() {
        return data("producer", Producer.class);
    }

}
