package com.server.cinema.database.movie_producer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.movie_producer.entity.MovieProducer;
import com.server.cinema.database.movie_producer.id.MovieProducerId;

@Repository
public interface MovieProducerRepository extends JpaRepository<MovieProducer, MovieProducerId> {
}
