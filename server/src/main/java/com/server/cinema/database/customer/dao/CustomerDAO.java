package com.server.cinema.database.customer.dao;

import com.server.cinema.database.customer.Customer;

public interface CustomerDAO {

    int addInactiveCustomer(final Customer customer);

}
