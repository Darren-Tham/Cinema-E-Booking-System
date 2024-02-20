package com.server.cinema.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface MovieRepository extends JpaRepository<Movie, Integer> {}
