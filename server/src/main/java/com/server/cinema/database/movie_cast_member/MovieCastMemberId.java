package com.server.cinema.database.movie_cast_member;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieCastMemberId implements Serializable {
    private int movieId;
    private int castMemberId;
}
