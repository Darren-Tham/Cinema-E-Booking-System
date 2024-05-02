package com.server.cinema.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

class DataManager {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private final ResourceLoader resourceLoader;

    @Autowired
    protected DataManager(final ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    protected final <T> List<T> data(final String fileName, final Class<T> clazz) {
        final String path = String.format("classpath:data/%s.json", fileName);
        final CollectionType listType = OBJECT_MAPPER.getTypeFactory().constructCollectionType(ArrayList.class, clazz);
        try {
            final InputStream inputStream = resourceLoader.getResource(path).getInputStream();
            return OBJECT_MAPPER.readValue(inputStream, listType);
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }
    }

    protected static final <T> Map<Integer, T> map(final Supplier<List<T>> listSupplier,
            final Function<T, Integer> idFunction) {
        return listSupplier
                .get()
                .stream()
                .collect(Collectors.toMap(idFunction, Function.identity()));
    }

    protected static final <T, R> List<T> dataFromRecords(final Supplier<List<R>> recordListSupplier,
            final Function<R, T> recordToClassFunction) {
        return recordListSupplier
                .get()
                .stream()
                .map(recordToClassFunction)
                .collect(Collectors.toList());
    }
}
