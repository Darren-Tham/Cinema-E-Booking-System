package com.server.cinema.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.server.cinema.database.director.entity.Director;
import com.server.cinema.database.movie.entity.Movie;
import com.server.cinema.database.movie_director.entity.MovieDirector;
import com.server.cinema.database.movie_director.id.MovieDirectorId;
import com.server.cinema.database.movie_director.record.MovieDirectorRecord;
import com.server.cinema.database.movie_producer.entity.MovieProducer;
import com.server.cinema.database.movie_producer.id.MovieProducerId;
import com.server.cinema.database.movie_producer.record.MovieProducerRecord;
import com.server.cinema.database.producer.entity.Producer;

@Component
public final class DataCollector {

    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;

    @Autowired
    private DataCollector(final ResourceLoader resourceLoader, final ObjectMapper objectMapper) {
        this.resourceLoader = resourceLoader;
        this.objectMapper = objectMapper;
    }

    public <T> List<T> getData(final String fileName, final Class<T> clazz) {
        final String path = String.format("classpath:data/%s.json", fileName);
        final CollectionType listType = objectMapper.getTypeFactory().constructCollectionType(ArrayList.class, clazz);
        try {
            final InputStream inputStream = resourceLoader.getResource(path).getInputStream();
            return objectMapper.readValue(inputStream, listType);
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public List<Movie> getMovies() {
        return getData("movie", Movie.class);
    }

    public List<Producer> getProducers() {
        return getData("producer", Producer.class);
    }

    public List<Director> getDirectors() {
        return getData("director", Director.class);
    }

    public List<MovieProducer> getMovieProducers() {
        final Map<Integer, Movie> movieMap = getMovieMap();
        final Map<Integer, Producer> producerMap = getProducerMap();
        return getDataFromRecords(this::getMovieProducerRecords,
                (final MovieProducerRecord movieProducerRecord) -> getMovieProducer(movieProducerRecord, movieMap,
                        producerMap));
    }

    public List<MovieDirector> getMovieDirectors() {
        final Map<Integer, Movie> movieMap = getMovieMap();
        final Map<Integer, Director> directorMap = getDirectorMap();
        return getDataFromRecords(this::getMovieDirectorRecords,
                (final MovieDirectorRecord movieDirectorRecord) -> getMovieDirector(movieDirectorRecord, movieMap,
                        directorMap));
    }

    private List<MovieProducerRecord> getMovieProducerRecords() {
        return getData("movie_producer", MovieProducerRecord.class);
    }

    private List<MovieDirectorRecord> getMovieDirectorRecords() {
        return getData("movie_director", MovieDirectorRecord.class);
    }

    private static MovieProducer getMovieProducer(final MovieProducerRecord movieProducerRecord,
            final Map<Integer, Movie> movieMap,
            final Map<Integer, Producer> producerMap) {
        final int movieId = movieProducerRecord.movieId();
        final int producerId = movieProducerRecord.producerId();
        final MovieProducerId movieProducerId = new MovieProducerId(movieId, producerId);
        return new MovieProducer(movieProducerId, movieMap.get(movieId), producerMap.get(producerId));
    }

    private static MovieDirector getMovieDirector(final MovieDirectorRecord movieDirectorRecord,
            final Map<Integer, Movie> movieMap, final Map<Integer, Director> directorMap) {
        final int movieId = movieDirectorRecord.movieId();
        final int directorId = movieDirectorRecord.directorId();
        final MovieDirectorId movieDirectorId = new MovieDirectorId(movieId, directorId);
        return new MovieDirector(movieDirectorId, movieMap.get(movieId), directorMap.get(directorId));
    }

    private static <T> Map<Integer, T> getMap(final Supplier<List<T>> listSupplier,
            final Function<T, Integer> idFunction) {
        return listSupplier
                .get()
                .stream()
                .collect(Collectors.toMap(idFunction, Function.identity()));
    }

    private Map<Integer, Movie> getMovieMap() {
        return getMap(this::getMovies, Movie::getId);
    }

    private Map<Integer, Producer> getProducerMap() {
        return getMap(this::getProducers, Producer::getId);
    }

    private Map<Integer, Director> getDirectorMap() {
        return getMap(this::getDirectors, Director::getId);
    }

    private static <T, R> List<T> getDataFromRecords(final Supplier<List<R>> recordListSupplier,
            final Function<R, T> recordToClassFunction) {
        return recordListSupplier
                .get()
                .stream()
                .map(recordToClassFunction)
                .collect(Collectors.toList());
    }
}
