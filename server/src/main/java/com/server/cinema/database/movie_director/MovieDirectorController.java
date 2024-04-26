package com.server.cinema.database.movie_director;

import com.server.cinema.database.movie.MovieService;
import com.server.cinema.database.movie_director.MovieDirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/moviedirector")
public class MovieDirectorController {

  private final MovieDirectorService movieDirectorService;

  @Autowired
  public MovieDirectorController(
    final MovieDirectorService movieDirectorService
  ) {
    this.movieDirectorService = movieDirectorService;
  }

  @PostMapping
  public void addMovieDirector(final MovieDirector movieDirector) {
    movieDirectorService.addMovieDirector(movieDirector);
  }
}
