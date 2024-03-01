package com.server.cinema.movie;

import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class MovieDTOMapper implements Function<Movie, MovieDTO> {

    @Override
    public MovieDTO apply(Movie movie) {
        return new MovieDTO(
                movie.getId(),
                movie.getName(),
                movie.getTrailerLink(),
                movie.getImageLink(),
                movie.getDescription(),
                movie.getCategory());
    }
}
