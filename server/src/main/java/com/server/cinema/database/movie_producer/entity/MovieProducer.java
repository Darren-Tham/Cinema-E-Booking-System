package com.server.cinema.database.movie_producer.entity;

import com.server.cinema.database.movie.entity.Movie;
import com.server.cinema.database.movie_producer.id.MovieProducerId;
import com.server.cinema.database.producer.entity.Producer;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public final class MovieProducer {

    @EmbeddedId
    private MovieProducerId id;
    
    @ManyToOne
    @MapsId("movieId")
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @MapsId("producerId")
    @JoinColumn(name = "producer_id")
    private Producer producer;

}
