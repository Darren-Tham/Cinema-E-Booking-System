package com.server.cinema.database.cast_member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CastMemberRepository extends JpaRepository<CastMember, Integer> {
}
