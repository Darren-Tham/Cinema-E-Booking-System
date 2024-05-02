package com.server.cinema.dto;

public record PromotionDTO(String name, int discountPercentage, String discountCode, String startDate, String endDate) {
}
