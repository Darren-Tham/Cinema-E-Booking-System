package com.server.cinema.movie;

import com.server.cinema.movie.Movie;
import com.server.cinema.movie.MovieDAO;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

  private MovieDAO movieDAO;
  private MovieDTOMapper movieDTOMapper;

  public MovieService(
    @Qualifier("jdbc") MovieDAO movieDAO,
    MovieDTOMapper movieDTOMapper
  ) {
    this.movieDAO = movieDAO;
    this.movieDTOMapper = movieDTOMapper;
  }

  public void addMovie(MovieAddRequest movieAddRequest) {
    Movie newMovie = new Movie(
      movieAddRequest.name(),
      movieAddRequest.trailerLink(),
      movieAddRequest.imageLink(),
      movieAddRequest.description()
    );

    movieDAO.addMovie(newMovie);
  }

  public MovieDTO getMovie(Integer id) {
    return movieDAO
      .selectMovieById(id)
      .map(movieDTOMapper)
      .orElseThrow(() -> new IllegalStateException("Movie not found"));
  }

  public List<MovieDTO> getAllMovies() {
    return movieDAO
      .selectAllMovies()
      .stream()
      .map(movieDTOMapper)
      .collect(Collectors.toList());
  }
}
