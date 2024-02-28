package com.server.cinema.movie;

import com.server.cinema.movie.Movie;
import com.server.cinema.movie.MovieRowMapper;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository("jdbc")
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
      "INSERT INTO movies (movie_name, trailer_link, image_link, movie_desc) VALUES (?, ?, ?, ?)";

    jdbcTemplate.update(
      sql,
      movie.getName(),
      movie.getTrailerLink(),
      movie.getImageLink(),
      movie.getDescription()
    );
  }

  @Override
  public List<Movie> selectAllMovies() {
    final String sql = "SELECT * FROM movies";
    return jdbcTemplate.query(sql, movieRowMapper);
  }

  @Override
  public Optional<Movie> selectMovieById(Integer id) {
    final String sql =
      "SELECT id, movie_name, trailer_link, image_link, movie_desc FROM movies WHERE id = ?";
    List<Movie> movies = jdbcTemplate.query(
      sql,
      new Object[] { id },
      movieRowMapper
    );
    return movies.stream().findFirst();
  }
}
