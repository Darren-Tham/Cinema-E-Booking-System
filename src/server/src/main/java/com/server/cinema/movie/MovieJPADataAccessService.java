package com.server.cinema.movie;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

public class MovieJPADataAccessService implements MovieDAO {

  private final MovieRepository movieRepository;

  public MovieJPADataAccessService(MovieRepository movieRepository) {
    this.movieRepository = movieRepository;
  }

  @Override
  public void addMovie(Movie movie) {
    movieRepository.save(movie);
  }
}
