package com.server.cinema.database.movie_director.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.movie_director.entity.MovieDirector;
import com.server.cinema.database.movie_director.id.MovieDirectorId;

@Repository
public interface MovieDirectorRepository extends JpaRepository<MovieDirector, MovieDirectorId> {
}
