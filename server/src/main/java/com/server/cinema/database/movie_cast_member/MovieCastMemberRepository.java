package com.server.cinema.database.movie_cast_member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieCastMemberRepository extends JpaRepository<MovieCastMember, MovieCastMemberId> {
}
