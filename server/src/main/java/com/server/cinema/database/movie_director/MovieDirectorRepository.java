package com.server.cinema.database.movie_director;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieDirectorRepository extends JpaRepository<MovieDirector, MovieDirectorId> {
}
