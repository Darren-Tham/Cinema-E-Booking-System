package com.server.cinema.dto;

import java.util.Set;

import com.server.cinema.enums.MovieRatingCode;
import com.server.cinema.enums.MovieStatus;

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
        Set<String> producers,
        double adultTicketPrice,
        double childTicketPrice,
        double seniorTicketPrice) {
}
