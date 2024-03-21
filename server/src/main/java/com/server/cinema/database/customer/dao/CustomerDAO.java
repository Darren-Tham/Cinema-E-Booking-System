package com.server.cinema.database.customer.dao;

import java.util.Optional;

import com.server.cinema.database.customer.Customer;

public interface CustomerDAO {

    int addInactiveCustomer(final Customer customer);

    boolean emailExists(final String email);

    Optional<Customer> getCustomerByEmail(final String email);

}
