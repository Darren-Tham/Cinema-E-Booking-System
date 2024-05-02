package com.server.cinema.config;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.entity.Movie;
import com.server.cinema.repository.MovieRepository;
import com.server.cinema.config.interfaces.InitRunnable;
import com.server.cinema.config.interfaces.MapSupplier;

@Component
public final class MovieDataManager extends DataManager
        implements MapSupplier<Movie>, InitRunnable {

    private final MovieRepository movieRepository;

    @Autowired
    private MovieDataManager(final ResourceLoader resourceLoader, final MovieRepository movieRepository) {
        super(resourceLoader);
        this.movieRepository = movieRepository;
    }

    @Override
    public void init() {
        movieRepository.saveAll(getMovies());
    }

    @Override
    public Map<Integer, Movie> getMap() {
        return map(this::getMovies, Movie::getId);
    }

    private List<Movie> getMovies() {
        return data("movie", Movie.class);
    }

}
