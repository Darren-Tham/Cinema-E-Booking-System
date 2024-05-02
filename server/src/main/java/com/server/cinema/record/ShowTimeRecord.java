package com.server.cinema.record;

import java.util.Set;

public record ShowtimeRecord(int id, int movieId, String dateTime, Set<String> unavailableSeats) {
}
