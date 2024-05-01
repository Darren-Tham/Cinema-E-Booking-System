package com.server.cinema.database.movie;

import java.util.Set;

import com.server.cinema.database.movie.enums.MovieRatingCode;
import com.server.cinema.database.movie.enums.MovieStatus;

public record NewMovieDTO(
        String title,
        String trailerLink,
        String imageLink,
        String synopsis,
        MovieRatingCode ratingCode,
        MovieStatus status,
        String ratingOutOf10,
        Set<String> categories,
        Set<String> castMembers,
        Set<String> directors,
        Set<String> producers) {
}
