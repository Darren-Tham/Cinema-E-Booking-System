package com.server.cinema.movie;

import com.server.cinema.movie.Movie;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface MovieRepository extends JpaRepository<Movie, Integer> {
  List<Movie> findByNameLike(String name);
}
