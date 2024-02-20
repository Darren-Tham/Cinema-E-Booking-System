package com.server.cinema.movie;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class MovieRowMapper implements RowMapper<Movie> {

  @Override
  public Movie mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new Movie(
      rs.getInt("id"),
      rs.getString("name"),
      rs.getString("trailerLink"),
      rs.getString("imageLink"),
      rs.getString("description")
    );
  }
}
