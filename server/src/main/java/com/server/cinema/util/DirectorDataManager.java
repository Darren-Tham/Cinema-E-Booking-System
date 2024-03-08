package com.server.cinema.util;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.server.cinema.database.director.Director;
import com.server.cinema.database.director.DirectorRepository;
import com.server.cinema.util.interfaces.InitRunnable;
import com.server.cinema.util.interfaces.MapSupplier;

@Component
public class DirectorDataManager extends DataManager
        implements MapSupplier<Director>, InitRunnable {

    private final DirectorRepository directorRepository;

    @Autowired
    private DirectorDataManager(final ResourceLoader resourceLoader, final DirectorRepository directorRepository) {
        super(resourceLoader);
        this.directorRepository = directorRepository;
    }

    @Override
    public void init() {
        directorRepository.saveAll(getDirectors());
    }

    @Override
    public Map<Integer, Director> getMap() {
        return map(this::getDirectors, Director::getId);
    }

    private List<Director> getDirectors() {
        return data("director", Director.class);
    }

}
