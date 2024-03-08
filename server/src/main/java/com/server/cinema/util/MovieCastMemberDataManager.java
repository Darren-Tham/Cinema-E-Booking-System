package com.server.cinema.util;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.database.cast_member.CastMember;
import com.server.cinema.database.movie.Movie;
import com.server.cinema.database.movie_cast_member.MovieCastMember;
import com.server.cinema.database.movie_cast_member.MovieCastMemberId;
import com.server.cinema.database.movie_cast_member.MovieCastMemberRecord;
import com.server.cinema.database.movie_cast_member.MovieCastMemberRepository;
import com.server.cinema.util.interfaces.InitRunnable;
import com.server.cinema.util.interfaces.MapSupplier;

@Component
public final class MovieCastMemberDataManager extends DataManager implements InitRunnable {

    private final MapSupplier<Movie> movieMapSupplier;
    private final MapSupplier<CastMember> castMemberMapSupplier;
    private final MovieCastMemberRepository movieCastMemberRepository;

    @Autowired
    private MovieCastMemberDataManager(
            final ResourceLoader resourceLoader,
            final MapSupplier<Movie> movieMapSupplier,
            final MapSupplier<CastMember> castMemberMapSupplier,
            final MovieCastMemberRepository movieCastMemberRepository) {
        super(resourceLoader);
        this.movieMapSupplier = movieMapSupplier;
        this.castMemberMapSupplier = castMemberMapSupplier;
        this.movieCastMemberRepository = movieCastMemberRepository;
    }

    @Override
    public void init() {
        movieCastMemberRepository.saveAll(getMovieCastMembers());
    }

    private List<MovieCastMember> getMovieCastMembers() {
        final Map<Integer, Movie> movieMap = movieMapSupplier.getMap();
        final Map<Integer, CastMember> castMemberMap = castMemberMapSupplier.getMap();
        return dataFromRecords(this::getMovieCastMemberRecords,
                (final MovieCastMemberRecord movieCastMemberRecord) -> getMovieCastMember(movieCastMemberRecord,
                        movieMap, castMemberMap));
    }

    private List<MovieCastMemberRecord> getMovieCastMemberRecords() {
        return data("movie_cast_member", MovieCastMemberRecord.class);
    }

    private static MovieCastMember getMovieCastMember(
            final MovieCastMemberRecord movieCastMemberRecord,
            final Map<Integer, Movie> movieMap,
            final Map<Integer, CastMember> castMemberMap) {
        final int movieId = movieCastMemberRecord.movieId();
        final int castMemberId = movieCastMemberRecord.castMemberId();
        final MovieCastMemberId movieCastMemberId = new MovieCastMemberId(movieId, castMemberId);
        return new MovieCastMember(movieCastMemberId, movieMap.get(movieId), castMemberMap.get(castMemberId));
    }

}
