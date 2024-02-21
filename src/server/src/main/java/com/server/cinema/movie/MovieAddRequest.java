package com.server.cinema.movie;

public record MovieAddRequest(
  Integer id,
  String name,
  String trailerLink,
  String imageLink,
  String description
) {}
