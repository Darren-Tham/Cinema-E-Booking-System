package com.server.cinema.database.director.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.director.entity.Director;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Integer> {
}
