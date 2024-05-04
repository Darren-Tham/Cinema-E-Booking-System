package com.server.cinema.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.MovieDTO;
import com.server.cinema.dto.NewMovieDTO;
import com.server.cinema.entity.Movie;
import com.server.cinema.repository.MovieRepository;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(final MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public void addMovie(final NewMovieDTO newMovieDTO) {
        final Movie movie = new Movie();
        movie.setTitle(newMovieDTO.title());
        movie.setTrailerLink(newMovieDTO.trailerLink());
        movie.setImageLink(newMovieDTO.imageLink());
        movie.setSynopsis(newMovieDTO.synopsis());
        movie.setRatingCode(newMovieDTO.ratingCode());
        movie.setStatus(newMovieDTO.status());
        movie.setRatingOutOf10(newMovieDTO.ratingOutOf10());
        movie.setCategories(newMovieDTO.categories());
        movie.setCastMembers(newMovieDTO.castMembers());
        movie.setProducers(newMovieDTO.producers());
        movie.setDirectors(newMovieDTO.directors());
        movie.setAdultTicketPrice(newMovieDTO.adultTicketPrice());
        movie.setChildTicketPrice(newMovieDTO.childTicketPrice());
        movie.setSeniorTicketPrice(newMovieDTO.seniorTicketPrice());
        movieRepository.save(movie);
    }

    public MovieDTO getMovieById(final int movieId) {
        return movieRepository
                .findById(movieId)
                .map(MovieService::toDTO)
                .orElseThrow();
    }

    public Set<String> getAllCategories() {
        final Set<String> categories = new HashSet<>();
        movieRepository
                .findAll()
                .stream()
                .forEach((final Movie movie) -> movie
                        .getCategories()
                        .forEach(categories::add));
        return categories;
    }

    public List<MovieDTO> getAllMovies() {
        return movieRepository
                .findAll()
                .stream()
                .map(MovieService::toDTO)
                .collect(Collectors.toList());
    }

    public List<MovieDTO> getSearchedMovies(final String searchQuery) {
        return movieRepository
                .findAllByTitleLike(searchQuery)
                .stream()
                .map(MovieService::toDTO)
                .collect(Collectors.toList());
    }

    public void updateMovie(final MovieDTO movieDTO) {
        final Movie movie = movieRepository.findById(movieDTO.id()).orElseThrow();
        movie.setTitle(movieDTO.title());
        movie.setTrailerLink(movieDTO.trailerLink());
        movie.setImageLink(movieDTO.imageLink());
        movie.setSynopsis(movieDTO.synopsis());
        movie.setRatingCode(movieDTO.ratingCode());
        movie.setStatus(movieDTO.status());
        movie.setRatingOutOf10(movieDTO.ratingOutOf10());
        movie.setCategories(movieDTO.categories());
        movie.setDirectors(movieDTO.directors());
        movie.setProducers(movieDTO.producers());
        movie.setCastMembers(movieDTO.castMembers());
        movie.setAdultTicketPrice(movieDTO.adultTicketPrice());
        movie.setChildTicketPrice(movieDTO.childTicketPrice());
        movie.setSeniorTicketPrice(movieDTO.seniorTicketPrice());
        movieRepository.save(movie);
    }

    private static MovieDTO toDTO(final Movie movie) {
        return new MovieDTO(
                movie.getId(),
                movie.getTitle(),
                movie.getTrailerLink(),
                movie.getImageLink(),
                movie.getSynopsis(),
                movie.getRatingCode(),
                movie.getStatus(),
                movie.getRatingOutOf10(),
                movie.getCategories(),
                movie.getCastMembers(),
                movie.getDirectors(),
                movie.getProducers(),
                movie.getAdultTicketPrice(),
                movie.getChildTicketPrice(),
                movie.getSeniorTicketPrice());
    }
}
