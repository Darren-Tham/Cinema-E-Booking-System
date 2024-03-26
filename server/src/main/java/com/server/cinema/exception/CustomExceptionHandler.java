package com.server.cinema.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.server.cinema.database.customer.exception.CustomerNotFoundException;
import com.server.cinema.database.customer.exception.LoginCredentialsInvalidException;
import com.server.cinema.database.home_address.HomeAddressNotFoundException;
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

    @ExceptionHandler(LoginCredentialsInvalidException.class)
    private static ResponseEntity<ExceptionFormatter> handleLoginCredentialsInvalidException(
            final LoginCredentialsInvalidException e) {
        return new ResponseEntity<>(new ExceptionFormatter(e.getMessage(), HttpStatus.UNAUTHORIZED),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(HomeAddressNotFoundException.class)
    private static ResponseEntity<ExceptionFormatter> handleHomeAddressNotFoundException(
            final HomeAddressNotFoundException e) {
        return new ResponseEntity<>(new ExceptionFormatter(e.getMessage(), HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

}
