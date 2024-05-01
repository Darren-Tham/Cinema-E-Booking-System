package com.server.cinema.database.movie;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.movie.dao.MovieDAO;
import com.server.cinema.database.movie.enums.MovieRatingCode;
import com.server.cinema.database.movie.enums.MovieStatus;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class MovieService {

    private final MovieDAO movieDAO;
    private final EntityManager entityManager;

    @Autowired
    public MovieService(final MovieDAO movieDAO, final EntityManager entityManager) {
        this.movieDAO = movieDAO;
        this.entityManager = entityManager;
    }

    public void addMovie(final Movie movie) {
        movieDAO.addMovie(movie);
    }

    public MovieDTO getMovieById(final int id) {
        return movieDAO
                .selectMovieById(id)
                .map(Movie::toDTO)
                .orElseThrow(() -> new MovieNotFoundException(String.format("Movie with id %d does not exist.", id)));
    }

    public List<MovieDTO> getAllMovies() {
        return movieDAO
                .selectAllMovies()
                .stream()
                .map(Movie::toDTO)
                .collect(Collectors.toList());
    }

    public List<MovieDTO> searchMovies(final String searchQuery) {
        return movieDAO
                .searchMovies(searchQuery)
                .stream()
                .map(Movie::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateMovie(final MovieDTO movieDTO) {
        final Movie movie = entityManager.find(Movie.class, movieDTO.id());
        movie.setTitle(movieDTO.title());
        movie.setTrailerLink(movieDTO.trailerLink());
        movie.setImageLink(movieDTO.imageLink());
        movie.setSynopsis(movieDTO.synopsis());
        movie.setRatingCode(MovieRatingCode.valueOf(movieDTO.ratingCode()));
        movie.setStatus(MovieStatus.valueOf(movieDTO.status()));
        movie.setRatingOutOf10(movieDTO.ratingOutOf10());
        movie.setCategories(movieDTO.categories());
        movie.setDirectors(movieDTO.directors());
        movie.setProducers(movieDTO.producers());
        movie.setCastMembers(movieDTO.castMembers());
        entityManager.persist(movie);
    }
}
