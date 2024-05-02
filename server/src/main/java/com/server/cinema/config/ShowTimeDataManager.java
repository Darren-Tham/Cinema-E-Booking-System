package com.server.cinema.config;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.entity.Movie;
import com.server.cinema.entity.Showtime;
import com.server.cinema.record.ShowtimeRecord;
import com.server.cinema.repository.ShowtimeRepository;
import com.server.cinema.config.interfaces.InitRunnable;
import com.server.cinema.config.interfaces.MapSupplier;

@Component
public class ShowtimeDataManager extends DataManager implements InitRunnable {

    private final MapSupplier<Movie> movieMapSupplier;
    private final ShowtimeRepository showTimeRepository;

    @Autowired
    public ShowtimeDataManager(
            final ResourceLoader resourceLoader,
            final MapSupplier<Movie> movieMapSupplier,
            final ShowtimeRepository showTimeRepository) {
        super(resourceLoader);
        this.movieMapSupplier = movieMapSupplier;
        this.showTimeRepository = showTimeRepository;
    }

    @Override
    public void init() {
        showTimeRepository.saveAll(getShowtimes());
    }

    private List<Showtime> getShowtimes() {
        final Map<Integer, Movie> movieMap = movieMapSupplier.getMap();
        return dataFromRecords(this::getShowtimeRecords,
                (final ShowtimeRecord showTimeRecord) -> getShowtime(showTimeRecord, movieMap));
    }

    private List<ShowtimeRecord> getShowtimeRecords() {
        return data("show_time", ShowtimeRecord.class);
    }

    private static Showtime getShowtime(final ShowtimeRecord showTimeRecord, final Map<Integer, Movie> movieMap) {
        final int movieId = showTimeRecord.movieId();
        return new Showtime(showTimeRecord.id(), movieMap.get(movieId), showTimeRecord.dateTime());
    }

}
