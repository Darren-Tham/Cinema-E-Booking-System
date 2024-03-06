package com.server.cinema.database.movie.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.movie.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    @Query("SELECT m FROM Movie m WHERE m.name LIKE %?1%")
    List<Movie> findByMovieNameLike(final String name);

}
