package com.server.cinema.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.dto.MovieDTO;
import com.server.cinema.dto.NewMovieDTO;
import com.server.cinema.service.MovieService;

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
    public List<MovieDTO> getSearchedMovies(
            @PathVariable final String query) {
        return movieService.getSearchedMovies(query);
    }

    @GetMapping("/categories")
    public Set<String> getAllCategories() {
        return movieService.getAllCategories();
    }

    @PutMapping("/update")
    public void updateMovie(@RequestBody final MovieDTO movieDTO) {
        movieService.updateMovie(movieDTO);
    }
}
