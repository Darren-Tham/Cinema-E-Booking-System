package com.server.cinema.util.interfaces;

import java.util.Map;

public interface MapSupplier<T> {
    Map<Integer, T> getMap();
}
