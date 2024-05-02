package com.server.cinema.exception;

import java.time.ZonedDateTime;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
class ExceptionFormatter {
    private final int statusCode;
    private final HttpStatus httpStatus;
    private final ZonedDateTime timestamp;

    ExceptionFormatter(final HttpStatus httpStatus) {
        this.statusCode = httpStatus.value();
        this.httpStatus = httpStatus;
        this.timestamp = ZonedDateTime.now();
    }
}
