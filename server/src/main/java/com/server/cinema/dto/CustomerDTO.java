package com.server.cinema.dto;

import com.server.cinema.enums.UserState;

public record CustomerDTO(
        int id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        UserState status,
        boolean isSubscribedForPromotions) {
}
