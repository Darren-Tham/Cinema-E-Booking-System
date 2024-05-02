package com.server.cinema.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.cinema.entity.Card;

public interface CardRepository extends JpaRepository<Card, Integer> {
    List<Card> findAllByCustomerId(final int customerId);
}
