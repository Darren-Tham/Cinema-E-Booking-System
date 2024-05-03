package com.server.cinema.entity;

import java.util.Set;

import com.server.cinema.enums.MovieRatingCode;
import com.server.cinema.enums.MovieStatus;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String trailerLink;

    @Column(nullable = false)
    private String imageLink;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String synopsis;

    @Column(name = "rating_out_of_10", nullable = false)
    private String ratingOutOf10;

    @Enumerated(EnumType.STRING)
    private MovieRatingCode ratingCode;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "category", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "category", nullable = false)
    private Set<String> categories;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "producer", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "name", nullable = false)
    private Set<String> producers;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "director", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "name", nullable = false)
    private Set<String> directors;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "cast_member", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "name", nullable = false)
    private Set<String> castMembers;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MovieStatus status;

    @Column(columnDefinition = "DECIMAL(4,2)", nullable = false)
    private double adultTicketPrice;

    @Column(columnDefinition = "DECIMAL(4,2)")
    private double childTicketPrice;

    @Column(columnDefinition = "DECIMAL(4,2)")
    private double seniorTicketPrice;

}
