package com.server.cinema.database.movie.exception;

public class MovieNotFoundException extends RuntimeException {
    public MovieNotFoundException(final String message) {
        super(message);
    }
}
