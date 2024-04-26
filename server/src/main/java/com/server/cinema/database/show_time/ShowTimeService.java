package com.server.cinema.database.show_time;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.movie.Movie;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class ShowTimeService {

    private final ShowTimeRepository showTimeRepository;
    private final EntityManager entityManager;

    @Autowired
    public ShowTimeService(final ShowTimeRepository showTimeRepository, final EntityManager entityManager) {
        this.showTimeRepository = showTimeRepository;
        this.entityManager = entityManager;
    }

    public List<ShowTimeDTO> getShowTimesByMovieId(final int movieId) {
        return showTimeRepository.findByMovieId(movieId).stream()
                .map((final ShowTime showTime) -> new ShowTimeDTO(showTime.getId(), movieId, showTime.getDateTime()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateShowTimes(final int movieId, Iterable<String> newDateTimes) {
        final Movie movie = entityManager.find(Movie.class, movieId);
        Set<ShowTime> showTimes = movie.getShowTimes();
        Set<String> dateTimes = showTimes.stream().map(ShowTime::getDateTime)
                .collect(Collectors.toSet());
        for (String dateTime : newDateTimes) {
            if (!dateTimes.contains(dateTime)) {
                final ShowTime showTime = new ShowTime();
                showTime.setMovie(movie);
                showTime.setDateTime(dateTime);
                showTimes.add(showTime);
                entityManager.persist(showTime);
            }
        }
        entityManager.persist(movie);
    }
}
