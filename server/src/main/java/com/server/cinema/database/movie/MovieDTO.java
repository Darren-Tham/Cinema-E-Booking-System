package com.server.cinema.database.movie;

public record MovieDTO(
        int id,
        String title,
        String trailerLink,
        String imageLink,
        String synopsis,
        String ratingCode,
        String status,
        String ratingOutOf10) {
}
