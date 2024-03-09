package com.server.cinema.util;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.database.movie.Movie;
import com.server.cinema.database.review.Review;
import com.server.cinema.database.review.ReviewRecord;
import com.server.cinema.database.review.ReviewRepository;
import com.server.cinema.util.interfaces.InitRunnable;
import com.server.cinema.util.interfaces.MapSupplier;

@Component
public final class ReviewDataManager extends DataManager implements InitRunnable {

    private final MapSupplier<Movie> movieMapSupplier;
    private final ReviewRepository reviewRepository;

    @Autowired
    private ReviewDataManager(
            final ResourceLoader resourceLoader,
            final MapSupplier<Movie> movieMapSupplier,
            final ReviewRepository reviewRepository) {
        super(resourceLoader);
        this.movieMapSupplier = movieMapSupplier;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void init() {
        reviewRepository.saveAll(getReviews());
    }

    private List<Review> getReviews() {
        Map<Integer, Movie> movieMap = movieMapSupplier.getMap();
        return dataFromRecords(this::getReviewRecords,
                (final ReviewRecord reviewRecord) -> getReview(reviewRecord, movieMap));
    }

    private List<ReviewRecord> getReviewRecords() {
        return data("review", ReviewRecord.class);
    }

    private static Review getReview(final ReviewRecord reviewRecord, Map<Integer, Movie> movieMap) {
        return new Review(
                reviewRecord.id(),
                movieMap.get(reviewRecord.movieId()),
                reviewRecord.ratingOutOf10(),
                reviewRecord.date(),
                reviewRecord.title(),
                reviewRecord.content());
    }

}
