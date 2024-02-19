package com.server.cinema.movie;

public class movie {

  private String name;
  private String trailerLink;
  private String imageLink;
  private String description;

  public movie(
    String name,
    String trailerLink,
    String imageLink,
    String description
  ) {
    this.name = name;
    this.trailerLink = trailerLink;
    this.imageLink = imageLink;
    this.description = description;
  }

  public String getName() {
    return name;
  }

  public String getTrailerLink() {
    return trailerLink;
  }

  public String getImageLink() {
    return imageLink;
  }

  public String getDescription() {
    return description;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setTrailerLink(String trailerLink) {
    this.trailerLink = trailerLink;
  }

  public void setImageLink(String imageLink) {
    this.imageLink = imageLink;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
