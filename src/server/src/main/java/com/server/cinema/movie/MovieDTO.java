package com.server.cinema.movie;

public record MovieDTO(
        Integer id,
        String name,
        String trailerLink,
        String imageLink,
        String description,
        String category) {
}
