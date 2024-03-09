package com.server.cinema.database.cast_member;

import java.util.Set;

import com.server.cinema.database.movie_cast_member.MovieCastMember;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class CastMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column
    private String name;

    @OneToMany(mappedBy = "castMember")
    private Set<MovieCastMember> movies;

}
