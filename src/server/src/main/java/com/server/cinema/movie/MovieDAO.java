package com.server.cinema.movie;

import java.util.List;
import java.util.Optional;

public interface MovieDAO {
  void addMovie(Movie movie);
  Optional<Movie> selectMovieById(Integer movieId);
  List<Movie> selectAllMovies();
}
