package com.server.cinema.email;

public record EmailDTO(String receiverEmail, String subject, String text) {
}
