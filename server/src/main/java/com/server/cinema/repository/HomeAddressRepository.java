package com.server.cinema.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.cinema.entity.HomeAddress;

public interface HomeAddressRepository extends JpaRepository<HomeAddress, Integer> {
    Optional<HomeAddress> findByCustomerId(final int customerId);
}
