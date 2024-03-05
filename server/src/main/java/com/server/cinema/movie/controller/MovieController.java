package com.server.cinema.movie.controller;

import java.util.List;

import com.server.cinema.movie.entity.Movie;
import com.server.cinema.movie.service.MovieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/movie")
final class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(final MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/add")
    ResponseEntity<String> addMovie(@RequestBody final Movie movie) {
        movieService.addMovie(movie);
        return new ResponseEntity<>("Movie has been successfully added.", HttpStatus.CREATED);
    }

    @GetMapping("/{movieId}")
    Movie getMovieById(@PathVariable final int movieId) {
        return movieService.getMovieById(movieId);
    }

    @GetMapping
    List<Movie> getMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/search")
    List<Movie> searchMovies(
            @RequestParam("query") final String searchQuery) {
        return movieService.searchMovies(searchQuery);
    }
}
