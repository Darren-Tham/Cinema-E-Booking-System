package com.server.cinema.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.dto.ShowtimeDTO;
import com.server.cinema.service.ShowtimeService;

@CrossOrigin
@RestController
@RequestMapping("api/showtimes")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    @Autowired
    public ShowtimeController(final ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
    }

    @GetMapping("/{showtimeId}")
    public ShowtimeDTO getShowtimeById(@PathVariable final int showtimeId) {
        return showtimeService.getShowtimeById(showtimeId);
    }

    @GetMapping("/movies/{movieId}")
    public List<ShowtimeDTO> getShowtimesByMovieId(@PathVariable final int movieId) {
        return showtimeService.getShowtimesByMovieId(movieId);
    }

    @PutMapping("/update-unavailable-seats/{showtimeId}")
    public void updateUnavailableSeats(@PathVariable final int showtimeId,
            @RequestBody final List<String> unavailableSeats) {
        showtimeService.updateUnavailableSeats(showtimeId, unavailableSeats);
    }

    @PutMapping("/movies/{movieId}")
    public void updateShowtimes(@PathVariable final int movieId, @RequestBody List<String> dateTimes) {
        showtimeService.updateShowtimes(movieId, dateTimes);
    }

}
