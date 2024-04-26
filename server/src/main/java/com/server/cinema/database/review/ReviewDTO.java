package com.server.cinema.database.review;

public record ReviewDTO(int id, int ratingOutOf10, String date, String title, String content) {
}
