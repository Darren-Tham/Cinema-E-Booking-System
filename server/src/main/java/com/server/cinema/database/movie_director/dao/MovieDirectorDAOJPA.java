package com.server.cinema.database.movie_director.dao;

import com.server.cinema.database.movie_director.MovieDirector;
import com.server.cinema.database.movie_director.MovieDirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MovieDirectorDAOJPA implements MovieDirectorDAO {

  private final MovieDirectorRepository movieDirectorRepository;

  @Autowired
  public MovieDirectorDAOJPA(
    final MovieDirectorRepository movieDirectorRepository
  ) {
    this.movieDirectorRepository = movieDirectorRepository;
  }

  @Override
  public void addMovieDirector(final MovieDirector movieDirector) {
    movieDirectorRepository.save(movieDirector);
  }
}
