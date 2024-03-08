package com.server.cinema.util;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.database.cast_member.CastMember;
import com.server.cinema.database.cast_member.CastMemberRepository;
import com.server.cinema.util.interfaces.InitRunnable;
import com.server.cinema.util.interfaces.MapSupplier;

@Component
public final class CastMemberDataManager extends DataManager implements MapSupplier<CastMember>, InitRunnable {

    private final CastMemberRepository castMemberRepository;

    @Autowired
    private CastMemberDataManager(final ResourceLoader resourceLoader,
            final CastMemberRepository castMemberRepository) {
        super(resourceLoader);
        this.castMemberRepository = castMemberRepository;
    }

    @Override
    public void init() {
        castMemberRepository.saveAll(getCastMembers());
    }

    @Override
    public Map<Integer, CastMember> getMap() {
        return map(this::getCastMembers, CastMember::getId);
    }

    private List<CastMember> getCastMembers() {
        return data("cast_member", CastMember.class);
    }

}
