package com.server.cinema.record;

public record ReviewRecord(int id, int movieId, int ratingOutOf10, String date, String title, String content) {
}
