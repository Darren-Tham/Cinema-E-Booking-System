package com.server.cinema.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.server.cinema.database.customer.CustomerNotFoundException;
import com.server.cinema.database.movie.MovieNotFoundException;

@ControllerAdvice
final class CustomExceptionHandler {

    private CustomExceptionHandler() {
    }

    @ExceptionHandler(MovieNotFoundException.class)
    private static ResponseEntity<ExceptionFormatter> handleMovieNotFoundException(final MovieNotFoundException e) {
        return new ResponseEntity<>(new ExceptionFormatter(e.getMessage(), HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CustomerNotFoundException.class)
    private static ResponseEntity<ExceptionFormatter> handleCustomerNotFoundException(
            final CustomerNotFoundException e) {
        return new ResponseEntity<>(new ExceptionFormatter(e.getMessage(), HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

}
