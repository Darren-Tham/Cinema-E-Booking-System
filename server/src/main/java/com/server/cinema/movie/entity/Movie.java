package com.server.cinema.movie.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public final class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column
    private String trailerLink;

    @Column
    private String imageLink;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String ratingCode;

    @Column
    private String producer;

    @Column
    private String category;

    @Column
    private String director;

    @Column
    private String castMembers;

    @Column
    private String times;

    @Column(columnDefinition = "DATE")
    private String dates;

    @Column(columnDefinition = "TEXT")
    private String reviews;

    @Column(columnDefinition = "TEXT")
    private String synopsis;

}
