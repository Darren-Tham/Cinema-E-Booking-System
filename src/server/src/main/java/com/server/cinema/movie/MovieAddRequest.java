package com.server.cinema.movie;

public record MovieAddRequest(
  String name,
  String trailerLink,
  String imageLink,
  String description
) {}
