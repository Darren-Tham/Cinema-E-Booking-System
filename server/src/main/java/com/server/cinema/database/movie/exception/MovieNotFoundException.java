package com.server.cinema.database.movie.exception;

public final class MovieNotFoundException extends RuntimeException {
    public MovieNotFoundException(final String message) {
        super(message);
    }
}
