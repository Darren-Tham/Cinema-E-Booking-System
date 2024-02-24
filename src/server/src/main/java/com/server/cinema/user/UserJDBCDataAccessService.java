package com.server.cinema.user;

import com.server.cinema.user.userRowMapper;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository("jdbc")
public class UserJDBCDataAccessService implements UserDAO {

  private final JdbcTemplate jdbcTemplate;
  private final UserRowMapper userRowMapper;

  public UserJDBCDataAccessService(
    JdbcTemplate jdbcTemplate,
    UserRowMapper userRowMapper
  ) {
    this.jdbcTemplate = jdbcTemplate;
    this.userRowMapper = userRowMapper;
  }

  @Override
  public void insertUser(User user) {
    var sql = "INSERT INTO users(email,password) VALUES(?,?)";
    int result = jdbcTemplate.update(sql, user.getEmail(), user.getPassword());
  }

  @Override
  @Query("")
  public boolean existsUserWithEmail(String email) {}

  @Override
  @Query("")
  public boolean existsUserWithId(Integer id) {}

  @Override
  @Query(value = "SELECT username from User WHERE username.email")
  public Optional<User> selectUserByEmail(String email) {}
}
