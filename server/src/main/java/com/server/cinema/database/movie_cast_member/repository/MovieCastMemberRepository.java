package com.server.cinema.database.movie_cast_member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.movie_cast_member.entity.MovieCastMember;
import com.server.cinema.database.movie_cast_member.id.MovieCastMemberId;

@Repository
public interface MovieCastMemberRepository extends JpaRepository<MovieCastMember, MovieCastMemberId> {
}
