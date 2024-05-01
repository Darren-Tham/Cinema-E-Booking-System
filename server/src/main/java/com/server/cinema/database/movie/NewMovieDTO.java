package com.server.cinema.database.movie;

import java.util.Set;

import com.server.cinema.database.movie.enums.MovieCategory;

public record NewMovieDTO(
        String title,
        String trailerLink,
        String imageLink,
        String synopsis,
        String ratingCode,
        String status,
        String ratingOutOf10,
        Set<MovieCategory> categories,
        Set<String> castMembers,
        Set<String> directors,
        Set<String> producers) {
}
