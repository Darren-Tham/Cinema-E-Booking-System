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
      "INSERT INTO movies (movie_name, trailer_link, image_link, movie_desc, movie_rating_code, movie_category, movie_producer, movie_director, movie_cast, movie_times, movie_date, review, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    jdbcTemplate.update(
      sql,
      movie.getName(),
      movie.getTrailerLink(),
      movie.getImageLink(),
      movie.getDescription(),
      movie.getRatingCode(),
      movie.getCategory(),
      movie.getProducer(),
      movie.getDirector(),
      movie.getCast(),
      movie.getTimes(),
      movie.getDate(),
      movie.getReview(),
      movie.getSynopsis()
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

  @Override
  public List<Movie> searchMovies(String searchQuery) {
    final String sql = "SELECT * FROM movies WHERE movie_name LIKE ?";
    return jdbcTemplate.query(
      sql,
      new Object[] { "%" + searchQuery + "%" },
      movieRowMapper
    );
  }
}
