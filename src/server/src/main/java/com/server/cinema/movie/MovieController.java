package com.server.cinema.movie;

import com.server.cinema.movie.MovieAddRequest;
import com.server.cinema.movie.MovieDTO;
import com.server.cinema.movie.MovieService;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMovie(@RequestBody MovieAddRequest request) {
        movieService.addMovie(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public MovieDTO getMovie(@PathVariable("id") Integer movieId) {
        return movieService.getMovie(movieId);
    }

    @GetMapping
    public List<MovieDTO> getMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/search")
    public List<MovieDTO> searchMovies(
            @RequestParam("query") String searchQuery) {
        return movieService.searchMovies(searchQuery);
    }
}
