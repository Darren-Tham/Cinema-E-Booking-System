package com.server.cinema.database.customer.dao;

import com.server.cinema.database.customer.Customer;

public interface CustomerDAO {

    void addInactiveCustomer(final Customer customer);

}
