package com.server.cinema.database.movie;

import java.util.Set;

public record MovieDTO(
        int id,
        String title,
        String trailerLink,
        String imageLink,
        String synopsis,
        String ratingCode,
        String status,
        String ratingOutOf10,
        Set<String> categories,
        Set<String> castMembers,
        Set<String> directors,
        Set<String> producers) {
}
