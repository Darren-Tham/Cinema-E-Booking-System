package com.server.cinema.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.server.cinema.database.movie.entity.Movie;
import com.server.cinema.database.movie_producer.entity.MovieProducer;
import com.server.cinema.database.movie_producer.id.MovieProducerId;
import com.server.cinema.database.movie_producer.record.MovieProducerRecord;
import com.server.cinema.database.producer.entity.Producer;

@Component
public final class DataCollectors {

    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;

    @Autowired
    private DataCollectors(final ResourceLoader resourceLoader, final ObjectMapper objectMapper) {
        this.resourceLoader = resourceLoader;
        this.objectMapper = objectMapper;
    }

    public <T> List<T> getData(final String fileName, final Class<T> clazz) {
        final String path = String.format("classpath:data/%s", fileName);
        final CollectionType listType = objectMapper.getTypeFactory().constructCollectionType(ArrayList.class, clazz);
        try {
            final InputStream inputStream = resourceLoader.getResource(path).getInputStream();
            return objectMapper.readValue(inputStream, listType);
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public List<Movie> getMovies() {
        return getData("movie_data.json", Movie.class);
    }

    private Map<Integer, Movie> getMovieMap() {
        final Map<Integer, Movie> movieMap = new HashMap<>();
        getMovies().forEach((final Movie movie) -> movieMap.put(movie.getId(), movie));
        return movieMap;
    }

    private Map<Integer, Producer> getProducerMap() {
        final Map<Integer, Producer> producerMap = new HashMap<>();
        getProducers().forEach((final Producer producer) -> producerMap.put(producer.getId(), producer));
        return producerMap;
    }

    public List<Producer> getProducers() {
        return getData("producer_data.json", Producer.class);
    }

    public List<MovieProducer> getMovieProducers() {
        final List<MovieProducer> movieProducers = new ArrayList<>();
        final Map<Integer, Movie> movieMap = getMovieMap();
        final Map<Integer, Producer> producerMap = getProducerMap();
        getMovieProducerRecords().forEach((final MovieProducerRecord movieProducerRecord) -> {
            final MovieProducer movieProducer = getMovieProducer(movieProducerRecord, movieMap, producerMap);
            movieProducers.add(movieProducer);
        });
        return movieProducers;
    }

    private List<MovieProducerRecord> getMovieProducerRecords() {
        return getData("movie_producer_data.json", MovieProducerRecord.class);
    }

    private static MovieProducer getMovieProducer(final MovieProducerRecord movieProducerRecord,
            Map<Integer, Movie> movieMap,
            Map<Integer, Producer> producerMap) {
        final int movieId = movieProducerRecord.movieId();
        final int producerId = movieProducerRecord.producerId();
        final MovieProducerId movieProducerId = new MovieProducerId(movieId, producerId);
        return new MovieProducer(movieProducerId, movieMap.get(movieId), producerMap.get(producerId));
    }
}
