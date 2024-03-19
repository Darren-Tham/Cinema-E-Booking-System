package com.server.cinema.database.customer;

import com.server.cinema.database.customer.enums.UserState;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class InactiveCustomerDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private boolean isSubscribedForPromotions;

    public Customer toCustomer() {
        return new Customer(
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                UserState.INACTIVE,
                isSubscribedForPromotions);
    }
}
