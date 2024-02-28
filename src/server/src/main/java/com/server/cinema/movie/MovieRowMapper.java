package com.server.cinema.movie;

import com.server.cinema.movie.Movie;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class MovieRowMapper implements RowMapper<Movie> {

  @Override
  public Movie mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new Movie(
      rs.getInt("id"),
      rs.getString("movie_name"),
      rs.getString("trailer_link"),
      rs.getString("image_link"),
      rs.getString("movie_desc")
    );
  }
}
