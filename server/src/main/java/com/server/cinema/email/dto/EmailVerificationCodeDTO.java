package com.server.cinema.email.dto;

public record EmailVerificationCodeDTO(String receiverEmail, String verificationCode) {
}
