package com.server.cinema.util;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.database.director.entity.Director;
import com.server.cinema.database.movie.entity.Movie;
import com.server.cinema.database.movie_director.entity.MovieDirector;
import com.server.cinema.database.movie_director.id.MovieDirectorId;
import com.server.cinema.database.movie_director.record.MovieDirectorRecord;
import com.server.cinema.database.movie_director.repository.MovieDirectorRepository;
import com.server.cinema.util.interfaces.InitRunnable;
import com.server.cinema.util.interfaces.MapSupplier;

@Component
public final class MovieDirectorDataManager extends DataManager implements InitRunnable {

    private final MapSupplier<Movie> movieMapSupplier;
    private final MapSupplier<Director> directorMapSupplier;
    private final MovieDirectorRepository movieDirectorRepository;

    @Autowired
    private MovieDirectorDataManager(
            final ResourceLoader resourceLoader,
            final MapSupplier<Movie> movieMapSupplier,
            final MapSupplier<Director> directorMapSupplier,
            final MovieDirectorRepository movieDirectorRepository) {
        super(resourceLoader);
        this.movieMapSupplier = movieMapSupplier;
        this.directorMapSupplier = directorMapSupplier;
        this.movieDirectorRepository = movieDirectorRepository;
    }

    @Override
    public void init() {
        movieDirectorRepository.saveAll(getMovieDirectors());
    }

    private List<MovieDirector> getMovieDirectors() {
        final Map<Integer, Movie> movieMap = movieMapSupplier.getMap();
        final Map<Integer, Director> directorMap = directorMapSupplier.getMap();
        return dataFromRecords(this::getMovieDirectorRecords,
                (final MovieDirectorRecord movieDirectorRecord) -> getMovieDirector(movieDirectorRecord, movieMap,
                        directorMap));
    }

    private List<MovieDirectorRecord> getMovieDirectorRecords() {
        return data("movie_director", MovieDirectorRecord.class);
    }

    private static MovieDirector getMovieDirector(final MovieDirectorRecord movieDirectorRecord,
            final Map<Integer, Movie> movieMap, final Map<Integer, Director> directorMap) {
        final int movieId = movieDirectorRecord.movieId();
        final int directorId = movieDirectorRecord.directorId();
        final MovieDirectorId movieDirectorId = new MovieDirectorId(movieId, directorId);
        return new MovieDirector(movieDirectorId, movieMap.get(movieId), directorMap.get(directorId));
    }
}
