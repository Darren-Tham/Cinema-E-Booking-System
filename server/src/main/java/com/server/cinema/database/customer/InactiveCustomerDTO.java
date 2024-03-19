package com.server.cinema.database.customer;

import com.server.cinema.database.customer.enums.UserState;

import lombok.Data;

@Data
public class InactiveCustomerDTO {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String password;
    private final String phoneNumber;

    public Customer toCustomer() {
        return new Customer(
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                UserState.INACTIVE);
    }
}
