package com.server.cinema.database.home_address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.customer.Customer;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class HomeAddressService {

    private final EntityManager entityManager;

    @Autowired
    public HomeAddressService(final EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public void addHomeAddress(final HomeAddressDTO homeAddressDTO) {
        Customer customer = entityManager.find(Customer.class, homeAddressDTO.customerId());
        final HomeAddress homeAddress = new HomeAddress(
                homeAddressDTO.address(),
                homeAddressDTO.city(),
                homeAddressDTO.state(),
                homeAddressDTO.zipcode(),
                customer);
        customer.setHomeAddress(homeAddress);
    }

}
