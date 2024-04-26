package com.server.cinema.database.movie_director;

import com.server.cinema.database.movie_director.dao.MovieDirectorDAO;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MovieDirectorService {

  private final MovieDirectorDAO movieDirectorDAO;

  @Autowired
  public MovieDirectorService(final MovieDirectorDAO movieDirectorDAO) {
    this.movieDirectorDAO = movieDirectorDAO;
  }

  public void addMovieDirector(final MovieDirector movieDirector) {
    movieDirectorDAO.addMovieDirector(movieDirector);
  }
}
