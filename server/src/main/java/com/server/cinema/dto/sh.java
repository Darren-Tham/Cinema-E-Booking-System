package com.server.cinema.dto;

import java.util.Set;

public record ShowtimeDTO(int id, String dateTime, Set<String> unavailableSeats) {
}
