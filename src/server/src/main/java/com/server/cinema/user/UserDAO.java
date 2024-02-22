package com.server.cinema.user;

import com.server.cinema.user.User;
import java.util.Optional;

public interface UserDAO {
  void insertUser(User user);
  boolean existsUserWithEmail(String email);
  boolean existsUserWithId(Integer userId);
  Optional<User> selectUserByEmail(String email);
}
