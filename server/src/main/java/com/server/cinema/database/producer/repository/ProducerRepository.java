package com.server.cinema.database.producer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.producer.entity.Producer;

@Repository
public interface ProducerRepository extends JpaRepository<Producer, Integer> {
}
