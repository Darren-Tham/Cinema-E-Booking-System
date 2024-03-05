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
    private int movieId;

    @Column(nullable = false)
    private String movieName;

    @Column()
    private String movieTrailerLink;

    @Column()
    private String movieImageLink;

    @Column(columnDefinition = "TEXT")
    private String movieDescription;

    @Column()
    private String movieRatingCode;

    @Column()
    private String movieProducer;

    @Column()
    private String movieCategory;

    @Column()
    private String movieDirector;

    @Column()
    private String movieCast;

    @Column()
    private String movieTimes;

    @Column(columnDefinition = "DATE")
    private String movieDates;

    @Column(columnDefinition = "TEXT")
    private String movieReviews;

    @Column(columnDefinition = "TEXT")
    private String movieSynopsis;

}
