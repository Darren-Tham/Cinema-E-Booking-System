package com.server.cinema.movie;

public record MovieAddRequest(
  String name,
  String trailerLink,
  String imageLink,
  String description,
  String ratingCode,
  String category,
  String producer,
  String director,
  String cast,
  String times,
  String date,
  String review,
  String synopsis
) {}
