package com.server.cinema.movie;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

@Entity
@Table(name = "movies")
public class Movie {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(
    name = "movie_name",
    nullable = false,
    columnDefinition = "VARCHAR(255)"
  )
  private String name;

  @Column(name = "trailer_link", columnDefinition = "VARCHAR(255)")
  private String trailerLink;

  @Column(name = "image_link", columnDefinition = "VARCHAR(255)")
  private String imageLink;

  @Column(name = "movie_desc", columnDefinition = "TEXT")
  private String description;

  @Column(name = "movie_rating_code", columnDefinition = "ENUM")
  private String ratingCode;

  @Column(name = "movie_category", columnDefinition = "VARCHAR(255)")
  private String category;

  @Column(name = "movie_producer", columnDefinition = "VARCHAR(255)")
  private String producer;

  @Column(name = "movie_director", columnDefinition = "VARCHAR(255)")
  private String director;

  @Column(name = "movie_cast", columnDefinition = "TEXT")
  private String cast;

  @Column(name = "movie_times", columnDefinition = "VARCHAR(255)")
  private String times;

  @Column(name = "movie_date", columnDefinition = "DATE")
  private String date;

  @Column(name = "review", columnDefinition = "TEXT")
  private String review;

  @Column(name = "synopsis", columnDefinition = "TEXT")
  private String synopsis;

  public Movie(
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
  ) {
    this.name = name;
    this.trailerLink = trailerLink;
    this.imageLink = imageLink;
    this.description = description;
    this.ratingCode = ratingCode;
    this.category = category;
    this.producer = producer;
    this.director = director;
    this.cast = cast;
    this.times = times;
    this.date = date;
    this.review = review;
    this.synopsis = synopsis;
  }

  public Movie(
    Integer id,
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
  ) {
    this.id = id;
    this.name = name;
    this.trailerLink = trailerLink;
    this.imageLink = imageLink;
    this.description = description;
    this.ratingCode = ratingCode;
    this.category = category;
    this.producer = producer;
    this.director = director;
    this.cast = cast;
    this.times = times;
    this.date = date;
    this.review = review;
    this.synopsis = synopsis;
  }

  public Integer getId() {
    return id;
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

  public String getRatingCode() {
    return ratingCode;
  }

  public void setRatingCode(String ratingCode) {
    this.ratingCode = ratingCode;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getProducer() {
    return producer;
  }

  public void setProducer(String producer) {
    this.producer = producer;
  }

  public String getDirector() {
    return director;
  }

  public void setDirector(String director) {
    this.director = director;
  }

  public String getCast() {
    return cast;
  }

  public void setCast(String cast) {
    this.cast = cast;
  }

  public String getTimes() {
    return times;
  }

  public void setTimes(String times) {
    this.times = times;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getReview() {
    return review;
  }

  public void setReview(String review) {
    this.review = review;
  }

  public String getSynopsis() {
    return synopsis;
  }

  public void setSynopsis(String synopsis) {
    this.synopsis = synopsis;
  }

  @Override
  public String toString() {
    return (
      "Movie{" +
      "id=" +
      id +
      ", name='" +
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
      ", rating=" +
      ratingCode +
      '\'' +
      ", category=" +
      category +
      '\'' +
      ", producer=" +
      producer +
      '\'' +
      ", director=" +
      director +
      '\'' +
      ", cast=" +
      cast +
      '\'' +
      ", times=" +
      times +
      '\'' +
      ", date=" +
      date +
      '\'' +
      ", review=" +
      review +
      '\'' +
      ", synopsis=" +
      synopsis +
      '}'
    );
  }
}
