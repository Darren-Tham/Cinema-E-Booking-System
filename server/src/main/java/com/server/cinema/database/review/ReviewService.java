package com.server.cinema.database.review;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(final ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<ReviewDTO> getReviewsByMovieId(final int movieId) {
        return reviewRepository
                .findByMovieId(movieId).stream().map((final Review review) -> new ReviewDTO(review.getId(),
                        review.getRatingOutOf10(), review.getDate(), review.getTitle(), review.getContent()))
                .collect(Collectors.toList());
    }

}
