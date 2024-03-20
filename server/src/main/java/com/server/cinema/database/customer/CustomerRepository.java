package com.server.cinema.database.customer;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query("SELECT CASE WHEN COUNT(c) = 1 THEN true ELSE false END FROM Customer c WHERE c.email = ?1")
    boolean existsByEmail(final String email);

}
