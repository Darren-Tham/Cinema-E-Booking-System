package com.server.cinema.config;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.entity.Movie;
import com.server.cinema.entity.ShowTime;
import com.server.cinema.record.ShowTimeRecord;
import com.server.cinema.repository.ShowTimeRepository;
import com.server.cinema.config.interfaces.InitRunnable;
import com.server.cinema.config.interfaces.MapSupplier;

@Component
public class ShowTimeDataManager extends DataManager implements InitRunnable {

    private final MapSupplier<Movie> movieMapSupplier;
    private final ShowTimeRepository showTimeRepository;

    @Autowired
    public ShowTimeDataManager(
            final ResourceLoader resourceLoader,
            final MapSupplier<Movie> movieMapSupplier,
            final ShowTimeRepository showTimeRepository) {
        super(resourceLoader);
        this.movieMapSupplier = movieMapSupplier;
        this.showTimeRepository = showTimeRepository;
    }

    @Override
    public void init() {
        showTimeRepository.saveAll(getShowTimes());
    }

    private List<ShowTime> getShowTimes() {
        final Map<Integer, Movie> movieMap = movieMapSupplier.getMap();
        return dataFromRecords(this::getShowTimeRecords,
                (final ShowTimeRecord showTimeRecord) -> getShowTime(showTimeRecord, movieMap));
    }

    private List<ShowTimeRecord> getShowTimeRecords() {
        return data("show_time", ShowTimeRecord.class);
    }

    private static ShowTime getShowTime(final ShowTimeRecord showTimeRecord, final Map<Integer, Movie> movieMap) {
        final int movieId = showTimeRecord.movieId();
        return new ShowTime(showTimeRecord.id(), movieMap.get(movieId), showTimeRecord.dateTime());
    }

}
