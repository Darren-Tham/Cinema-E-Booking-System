package com.server.cinema.database.customer.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.customer.Customer;
import com.server.cinema.database.customer.CustomerRepository;

@Repository
public class CustomerDAOJPA implements CustomerDAO {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerDAOJPA(final CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public int addInactiveCustomer(final Customer customer) {
        return customerRepository.save(customer).getId();
    }

}
