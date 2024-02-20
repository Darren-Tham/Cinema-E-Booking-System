package com.server.cinema.movie;

import com.server.cinema.movie.Movie;
import com.server.cinema.movie.MovieDAO;

public class MovieService {

  private MovieDAO movieDAO;

  public void addMovie(Movie movie) {
    Movie newMovie = new Movie(
      movie.getId(),
      movie.getName(),
      movie.getTrailerLink(),
      movie.getImageLink(),
      movie.getDescription()
    );

    movieDAO.addMovie(newMovie);
  }
}
