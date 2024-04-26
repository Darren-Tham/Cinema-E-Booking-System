package com.server.cinema.database.show_time;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowTimeRepository extends JpaRepository<ShowTime, Integer> {
    List<ShowTime> findByMovieId(final int movieId);
}
