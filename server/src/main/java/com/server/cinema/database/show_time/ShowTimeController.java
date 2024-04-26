package com.server.cinema.database.show_time;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/show_time")
public class ShowTimeController {

    private final ShowTimeService showTimeService;

    @Autowired
    public ShowTimeController(final ShowTimeService showTimeService) {
        this.showTimeService = showTimeService;
    }

    @GetMapping("/movieId/{movieId}")
    public List<ShowTimeDTO> getShowTimesByMovieId(@PathVariable final int movieId) {
        return showTimeService.getShowTimesByMovieId(movieId);
    }

    @PutMapping("/update/movieId/{movieId}")
    public void updateShowTimes(@PathVariable final int movieId, @RequestBody List<String> dateTimes) {
        showTimeService.updateShowTimes(movieId, dateTimes);
    }

}
