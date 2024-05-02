package com.server.cinema.exception;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
final class CustomExceptionHandler {

    private CustomExceptionHandler() {
    }

    @ExceptionHandler(NoSuchElementException.class)
    private static ExceptionFormatter handleNoSuchElementException(final NoSuchElementException e) {
        return new ExceptionFormatter(HttpStatus.NOT_FOUND);
    }

}
