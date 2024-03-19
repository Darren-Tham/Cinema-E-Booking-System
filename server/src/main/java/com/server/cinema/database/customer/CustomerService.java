package com.server.cinema.database.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.customer.dao.CustomerDAO;

@Service
public class CustomerService {

    private final CustomerDAO customerDAO;

    @Autowired
    public CustomerService(final CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    public void addInactiveCustomer(final Customer customer) {
        customerDAO.addInactiveCustomer(customer);
    }

}
