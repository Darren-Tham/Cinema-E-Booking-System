package com.server.cinema.database.movie_director;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDirectorId implements Serializable {

    private int movieId;
    private int directorId;

}
