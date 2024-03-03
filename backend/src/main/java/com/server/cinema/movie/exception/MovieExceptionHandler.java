package com.server.cinema.movie.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
final class MovieExceptionHandler {

    private MovieExceptionHandler() {
    }

    @ExceptionHandler(MovieNotFoundException.class)
    private static ResponseEntity<ExceptionFormatter> handleMovieNotFoundException(MovieNotFoundException e) {
        return new ResponseEntity<>(new ExceptionFormatter(e.getMessage(), HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

}
