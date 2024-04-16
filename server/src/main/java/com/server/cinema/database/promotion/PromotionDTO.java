package com.server.cinema.database.promotion;

public record PromotionDTO(String name, int discountPercentage, String discountCode, String startDate, String endDate) {
}
