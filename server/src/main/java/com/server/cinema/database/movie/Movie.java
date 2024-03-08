package com.server.cinema.database.movie;

import java.util.Set;

import com.server.cinema.database.movie_cast_member.MovieCastMember;
import com.server.cinema.database.movie_director.MovieDirector;
import com.server.cinema.database.movie_producer.MovieProducer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column
    private String trailerLink;

    @Column
    private String imageLink;

    @Column(columnDefinition = "TEXT")
    private String synopsis;

    @Column
    private String ratingCode;

    @OneToMany(mappedBy = "movie")
    private Set<MovieProducer> producers;

    @Column
    private String category;

    @OneToMany(mappedBy = "movie")
    private Set<MovieDirector> directors;

    @OneToMany(mappedBy = "movie")
    private Set<MovieCastMember> castMembers;

    @Column
    private String times;

    @Column(columnDefinition = "DATE")
    private String dates;

    @Column(columnDefinition = "TEXT")
    private String reviews;

}
