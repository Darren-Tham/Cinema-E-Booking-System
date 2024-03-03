package com.server.cinema.movie.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.server.cinema.movie.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    @Query("SELECT m FROM movie m WHERE m.movie_name LIKE %?1%")
    List<Movie> findByMovieNameLike(final String movieName);

}
