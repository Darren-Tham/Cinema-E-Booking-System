package com.server.cinema.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.ShowTimeDTO;
import com.server.cinema.entity.Movie;
import com.server.cinema.entity.ShowTime;
import com.server.cinema.repository.MovieRepository;
import com.server.cinema.repository.ShowTimeRepository;

@Service
public class ShowTimeService {

    private final ShowTimeRepository showTimeRepository;
    private final MovieRepository movieRepository;

    @Autowired
    public ShowTimeService(final ShowTimeRepository showTimeRepository, final MovieRepository movieRepository) {
        this.showTimeRepository = showTimeRepository;
        this.movieRepository = movieRepository;
    }

    public List<ShowTimeDTO> getShowTimesByMovieId(final int movieId) {
        return showTimeRepository
                .findByMovieId(movieId)
                .stream()
                .map((final ShowTime showTime) -> new ShowTimeDTO(
                        showTime.getId(),
                        movieId,
                        showTime.getDateTime()))
                .collect(Collectors.toList());
    }

    public void updateShowTimes(final int movieId, Iterable<String> dateTimes) {
        final Movie movie = movieRepository.findById(movieId).orElseThrow();
        showTimeRepository.deleteAll();
        for (final String dateTime : dateTimes) {
            final ShowTime showTime = new ShowTime();
            showTime.setDateTime(dateTime);
            showTime.setMovie(movie);
            showTimeRepository.save(showTime);
        }
    }
}
