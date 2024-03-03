package com.server.cinema.movie.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.cinema.movie.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByNameLike(String name);
}
