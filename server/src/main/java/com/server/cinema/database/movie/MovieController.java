package com.server.cinema.database.movie;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(final MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/add")
    public void addMovie(@RequestBody final NewMovieDTO movie) {
        movieService.addMovie(movie);
    }

    @GetMapping("/{movieId}")
    public MovieDTO getMovieById(@PathVariable final int movieId) {
        return movieService.getMovieById(movieId);
    }

    @GetMapping
    public List<MovieDTO> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/search/{query}")
    public List<MovieDTO> searchMovies(
            @PathVariable final String query) {
        return movieService.searchMovies(query);
    }

    @PutMapping("/update")
    public void updateMovie(@RequestBody final MovieDTO movieDTO) {
        movieService.updateMovie(movieDTO);
    }
}
