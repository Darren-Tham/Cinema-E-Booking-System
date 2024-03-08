package com.server.cinema.database.movie_producer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieProducerRepository extends JpaRepository<MovieProducer, MovieProducerId> {
}
