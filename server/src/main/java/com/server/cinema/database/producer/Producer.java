package com.server.cinema.database.producer;

import java.util.Set;

import com.server.cinema.database.movie_producer.MovieProducer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Producer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column
    private String name;

    @OneToMany(mappedBy = "producer")
    private Set<MovieProducer> movies;
}
