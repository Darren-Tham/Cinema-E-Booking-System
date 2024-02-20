package com.server.cinema.movie;

import com.server.cinema.movie.Movie;
import com.server.cinema.movie.MovieRowMapper;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

public class MovieJDBCDataAccessService implements MovieDAO {

  private final JdbcTemplate jdbcTemplate;
  private final MovieRowMapper movieRowMapper;

  public MovieJDBCDataAccessService(
    JdbcTemplate jdbcTemplate,
    MovieRowMapper movieRowMapper
  ) {
    this.jdbcTemplate = jdbcTemplate;
    this.movieRowMapper = movieRowMapper;
  }

  @Override
  public void addMovie(Movie movie) {
    final String sql =
      "INSERT INTO movie (id, name, trailerLink, imageLink, description) VALUES (?, ?, ?, ?, ?)";
    jdbcTemplate.update(
      sql,
      movie.getId(),
      movie.getName(),
      movie.getTrailerLink(),
      movie.getImageLink(),
      movie.getDescription()
    );
  }
}
