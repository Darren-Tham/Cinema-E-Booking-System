package com.server.cinema.util;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.database.movie.entity.Movie;
import com.server.cinema.database.movie_producer.entity.MovieProducer;
import com.server.cinema.database.movie_producer.id.MovieProducerId;
import com.server.cinema.database.movie_producer.record.MovieProducerRecord;
import com.server.cinema.database.movie_producer.repository.MovieProducerRepository;
import com.server.cinema.database.producer.entity.Producer;
import com.server.cinema.util.interfaces.InitRunnable;
import com.server.cinema.util.interfaces.MapSupplier;

@Component
public final class MovieProducerDataManager extends DataManager implements InitRunnable {

    private final MapSupplier<Movie> movieMapSupplier;
    private final MapSupplier<Producer> producerMapSupplier;
    private final MovieProducerRepository movieProducerRepository;

    @Autowired
    private MovieProducerDataManager(
            final ResourceLoader resourceLoader,
            final MapSupplier<Movie> movieMapSupplier,
            final MapSupplier<Producer> producerMapSupplier,
            final MovieProducerRepository movieProducerRepository) {
        super(resourceLoader);
        this.movieMapSupplier = movieMapSupplier;
        this.producerMapSupplier = producerMapSupplier;
        this.movieProducerRepository = movieProducerRepository;
    }

    @Override
    public void init() {
        movieProducerRepository.saveAll(getMovieProducers());
    }

    private List<MovieProducer> getMovieProducers() {
        final Map<Integer, Movie> movieMap = movieMapSupplier.getMap();
        final Map<Integer, Producer> producerMap = producerMapSupplier.getMap();
        return dataFromRecords(this::getMovieProducerRecords,
                (final MovieProducerRecord movieProducerRecord) -> getMovieProducer(movieProducerRecord, movieMap,
                        producerMap));
    }

    private List<MovieProducerRecord> getMovieProducerRecords() {
        return data("movie_producer", MovieProducerRecord.class);
    }

    private static MovieProducer getMovieProducer(final MovieProducerRecord movieProducerRecord,
            final Map<Integer, Movie> movieMap,
            final Map<Integer, Producer> producerMap) {
        final int movieId = movieProducerRecord.movieId();
        final int producerId = movieProducerRecord.producerId();
        final MovieProducerId movieProducerId = new MovieProducerId(movieId, producerId);
        return new MovieProducer(movieProducerId, movieMap.get(movieId), producerMap.get(producerId));
    }

}
