package com.server.cinema.config.interfaces;

import java.util.Map;

public interface MapSupplier<T> {
    Map<Integer, T> getMap();
}
