package com.server.cinema.database.movie_cast_member.id;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public final class MovieCastMemberId implements Serializable {
    private int movieId;
    private int castMemberId;
}
