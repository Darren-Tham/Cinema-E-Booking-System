package com.server.cinema.movie;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

// @Table(name = "movies")
@Entity
public class Movie {

  public Movie() {}

  @Column(name = "movie_name", nullable = false)
  private String name;

  @Column(name = "trailer_link", nullable = false)
  private String trailerLink;

  @Column(name = "image_link", nullable = false)
  private String imageLink;

  @Column(name = "movie_desc", nullable = false)
  private String description;

  public Movie(
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

  public void setName(String name) {
    this.name = name;
  }

  public String getTrailerLink() {
    return trailerLink;
  }

  public void setTrailerLink(String trailerLink) {
    this.trailerLink = trailerLink;
  }

  public String getImageLink() {
    return imageLink;
  }

  public void setImageLink(String imageLink) {
    this.imageLink = imageLink;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public String toString() {
    return (
      "Movie{" +
      "name='" +
      name +
      '\'' +
      ", trailer_link='" +
      trailerLink +
      '\'' +
      ", image_link=" +
      imageLink +
      '\'' +
      ", description=" +
      description +
      '\'' +
      '}'
    );
  }
}