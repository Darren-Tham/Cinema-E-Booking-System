package com.server.cinema.repository;

import org.springframework.stereotype.Repository;

import com.server.cinema.entity.Customer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByEmail(final String email);
}
