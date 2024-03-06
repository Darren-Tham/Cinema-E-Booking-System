package com.server.cinema.database.movie.exception;

import java.time.ZonedDateTime;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
final class ExceptionFormatter {
    private final String message;
    private final int statusCode;
    private final HttpStatus httpStatus;
    private final ZonedDateTime timestamp;

    ExceptionFormatter(final String message, final HttpStatus httpStatus) {
        this.message = message;
        this.statusCode = httpStatus.value();
        this.httpStatus = httpStatus;
        this.timestamp = ZonedDateTime.now();
    }
}
