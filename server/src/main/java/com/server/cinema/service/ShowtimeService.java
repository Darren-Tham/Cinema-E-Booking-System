package com.server.cinema.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.ShowtimeDTO;
import com.server.cinema.entity.Movie;
import com.server.cinema.entity.Showtime;
import com.server.cinema.repository.MovieRepository;
import com.server.cinema.repository.ShowtimeRepository;

@Service
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final MovieRepository movieRepository;

    @Autowired
    public ShowtimeService(final ShowtimeRepository showtimeRepository, final MovieRepository movieRepository) {
        this.showtimeRepository = showtimeRepository;
        this.movieRepository = movieRepository;
    }

    public ShowtimeDTO getShowtimeById(final int showtimeId) {
        return showtimeRepository
                .findById(showtimeId)
                .map(ShowtimeService::toDTO)
                .orElseThrow();
    }

    public List<ShowtimeDTO> getShowtimesByMovieId(final int movieId) {
        return showtimeRepository
                .findByMovieId(movieId)
                .stream()
                .map(ShowtimeService::toDTO)
                .collect(Collectors.toList());
    }

    public void updateUnavailableSeats(final int showtimeId, final List<String> newUnavailableSeats) {
        final Showtime showtime = showtimeRepository.findById(showtimeId).orElseThrow();
        final Set<String> unavailableSeats = showtime.getUnavailableSeats();
        unavailableSeats.addAll(newUnavailableSeats);
        showtimeRepository.save(showtime);
    }

    public void updateShowtimes(final int movieId, Iterable<String> dateTimes) {
        final Movie movie = movieRepository.findById(movieId).orElseThrow();
        showtimeRepository.deleteAll();
        for (final String dateTime : dateTimes) {
            final Showtime showTime = new Showtime();
            showTime.setDateTime(dateTime);
            showTime.setMovie(movie);
            showtimeRepository.save(showTime);
        }
    }

    private static ShowtimeDTO toDTO(final Showtime showtime) {
        return new ShowtimeDTO(
                showtime.getId(),
                showtime.getDateTime(),
                showtime.getUnavailableSeats());
    }
}
