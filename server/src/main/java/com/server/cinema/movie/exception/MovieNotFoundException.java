package com.server.cinema.movie.exception;

public final class MovieNotFoundException extends RuntimeException {
    public MovieNotFoundException(final String message) {
        super(message);
    }
}
