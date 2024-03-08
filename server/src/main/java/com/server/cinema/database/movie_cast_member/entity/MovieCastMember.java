package com.server.cinema.database.movie_cast_member.entity;

import com.server.cinema.database.cast_member.entity.CastMember;
import com.server.cinema.database.movie.entity.Movie;
import com.server.cinema.database.movie_cast_member.id.MovieCastMemberId;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public final class MovieCastMember {

    @EmbeddedId
    private MovieCastMemberId id;

    @ManyToOne
    @MapsId("movieId")
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @MapsId("castMemberId")
    @JoinColumn(name = "cast_member_id")
    private CastMember castMember;
}
