package com.server.cinema.database.movie;

import java.util.Set;
import java.util.stream.Collectors;

import com.server.cinema.database.movie.enums.MovieCategory;
import com.server.cinema.database.movie.enums.MovieRatingCode;
import com.server.cinema.database.movie.enums.MovieStatus;
import com.server.cinema.database.movie_cast_member.MovieCastMember;
import com.server.cinema.database.movie_director.MovieDirector;
import com.server.cinema.database.movie_producer.MovieProducer;
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

    @OneToMany(mappedBy = "movie", fetch = FetchType.EAGER)
    private Set<MovieProducer> producers;

    @ElementCollection(targetClass = MovieCategory.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "movie_category", joinColumns = @JoinColumn(name = "movie_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Set<MovieCategory> categories;

    @OneToMany(mappedBy = "movie", fetch = FetchType.EAGER)
    private Set<MovieDirector> directors;

    @OneToMany(mappedBy = "movie", fetch = FetchType.EAGER)
    private Set<MovieCastMember> castMembers;

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
        final Set<String> castMemberNames = castMembers.stream()
                .map((final MovieCastMember movieClassMember) -> movieClassMember.getCastMember().getName())
                .collect(Collectors.toSet());
        final Set<String> directorNames = directors.stream()
                .map((final MovieDirector movieDirector) -> movieDirector.getDirector().getName())
                .collect(Collectors.toSet());
        final Set<String> producerNames = producers.stream()
                .map((final MovieProducer movieProducer) -> movieProducer.getProducer().getName())
                .collect(Collectors.toSet());
        return new MovieDTO(id,
                title,
                trailerLink,
                imageLink,
                synopsis,
                ratingCodeStr,
                statusStr,
                ratingOutOf10,
                categories,
                castMemberNames,
                directorNames,
                producerNames);
    }

}
