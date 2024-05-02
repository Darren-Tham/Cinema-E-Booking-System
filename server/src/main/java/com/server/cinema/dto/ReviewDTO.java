package com.server.cinema.dto;

public record ReviewDTO(int id, int ratingOutOf10, String date, String title, String content) {
}
