package com.server.cinema.database.cast_member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.cast_member.entity.CastMember;

@Repository
public interface CastMemberRepository extends JpaRepository<CastMember, Integer> {
}
