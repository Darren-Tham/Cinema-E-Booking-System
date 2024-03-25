package com.server.cinema.database.home_address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.customer.Customer;
import com.server.cinema.database.home_address.dto.HomeAddressDTO;
import com.server.cinema.database.home_address.dto.HomeAddressDTONoId;

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

    public HomeAddressDTONoId getHomeAddress(final int customerId) {
        final Customer customer = entityManager.find(Customer.class, customerId);
        final HomeAddress homeAddress = customer.getHomeAddress();
        if (homeAddress == null) {
            final String msg = String.format("Customer with id %d does not have a home address.", customer.getId());
            throw new HomeAddressNotFoundException(msg);
        } else {
            return new HomeAddressDTONoId(
                    homeAddress.getAddress(),
                    homeAddress.getCity(),
                    homeAddress.getState(),
                    homeAddress.getZipcode());
        }
    }

}
