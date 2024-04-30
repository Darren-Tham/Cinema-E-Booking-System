package com.server.cinema.database.customer.dto;

import com.server.cinema.database.customer.enums.UserState;

public record CustomerDTO(int id, String firstName, String lastName, String email, String phoneNumber,
        UserState status, boolean isSubscribedForPromotions) {
}
