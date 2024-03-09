package com.server.cinema.database.movie_cast_member;

import com.server.cinema.database.cast_member.CastMember;
import com.server.cinema.database.movie.Movie;

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
public class MovieCastMember {

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
