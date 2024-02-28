package com.server.cinema.movie;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "movie_name", nullable = false)
    private String name;

    @Column(name = "trailer_link", nullable = false, columnDefinition = "TEXT")
    private String trailerLink;

    @Column(name = "image_link", nullable = false, columnDefinition = "TEXT")
    private String imageLink;

    @Column(name = "movie_desc", nullable = false, columnDefinition = "TEXT")
    private String description;

    public Movie() {
    }

    public Movie(
            String name,
            String trailerLink,
            String imageLink,
            String description) {
        this.name = name;
        this.trailerLink = trailerLink;
        this.imageLink = imageLink;
        this.description = description;
    }

    public Movie(
            Integer id,
            String name,
            String trailerLink,
            String imageLink,
            String description) {
        this.id = id;
        this.name = name;
        this.trailerLink = trailerLink;
        this.imageLink = imageLink;
        this.description = description;
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

    @Override
    public String toString() {
        return ("Movie{" +
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
                '}');
    }
}
