package com.server.cinema.database.movie;

import java.util.Set;

import com.server.cinema.database.movie.enums.MovieCategory;
import com.server.cinema.database.movie.enums.MovieRatingCode;
import com.server.cinema.database.movie.enums.MovieStatus;
import com.server.cinema.database.review.Review;
import com.server.cinema.database.show_room.ShowRoom;
import com.server.cinema.database.show_time.ShowTime;

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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
    @Column(insertable = false, updatable = false)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column
    private String trailerLink;

    @Column
    private String imageLink;

    @Column(columnDefinition = "TEXT")
    private String synopsis;

    @Column(name = "rating_out_of_10")
    private String ratingOutOf10;

    @Enumerated(EnumType.STRING)
    private MovieRatingCode ratingCode;

    @ElementCollection(targetClass = MovieCategory.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "movie_category", joinColumns = @JoinColumn(name = "movie_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Set<MovieCategory> categories;

    @ElementCollection
    @CollectionTable(name = "producer", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "name", nullable = false)
    private Set<String> producers;

    @ElementCollection
    @CollectionTable(name = "director", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "name", nullable = false)
    private Set<String> directors;

    @ElementCollection
    @CollectionTable(name = "cast_member", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "name", nullable = false)
    private Set<String> castMembers;

    @OneToMany(mappedBy = "movie")
    private Set<ShowTime> showTimes;

    @OneToMany(mappedBy = "movie")
    private Set<Review> reviews;

    @Enumerated(EnumType.STRING)
    private MovieStatus status;

    @ManyToMany
    @JoinTable(name = "movie_show_room", joinColumns = @JoinColumn(name = "movie_id"), inverseJoinColumns = @JoinColumn(name = "show_room_id"))
    private Set<ShowRoom> showRooms;

    public MovieDTO toDTO() {
        final String ratingCodeStr = ratingCode == null
                ? "NULL"
                : ratingCode.toString();
        final String statusStr = status == null
                ? "NULL"
                : status.toString();
        return new MovieDTO(id,
                title,
                trailerLink,
                imageLink,
                synopsis,
                ratingCodeStr,
                statusStr,
                ratingOutOf10,
                categories,
                castMembers,
                directors,
                producers);
    }
}
