package com.server.cinema.database.home_address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.customer.Customer;
import com.server.cinema.database.home_address.dto.CustomerHomeAddressDTO;
import com.server.cinema.database.home_address.dto.ProfileHomeAddressDTO;

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
    public void addHomeAddress(final CustomerHomeAddressDTO homeAddressDTO) {
        Customer customer = entityManager.find(Customer.class, homeAddressDTO.customerId());
        final HomeAddress homeAddress = new HomeAddress(
                homeAddressDTO.address(),
                homeAddressDTO.city(),
                homeAddressDTO.state(),
                homeAddressDTO.zipcode(),
                customer);
        customer.setHomeAddress(homeAddress);
    }

    public ProfileHomeAddressDTO getHomeAddress(final int customerId) {
        final Customer customer = entityManager.find(Customer.class, customerId);
        final HomeAddress homeAddress = customer.getHomeAddress();
        if (homeAddress == null) {
            final String msg = String.format("Customer with id %d does not have a home address.", customer.getId());
            throw new HomeAddressNotFoundException(msg);
        } else {
            return new ProfileHomeAddressDTO(
                    homeAddress.getId(),
                    homeAddress.getAddress(),
                    homeAddress.getCity(),
                    homeAddress.getState(),
                    homeAddress.getZipcode());
        }
    }

    @Transactional
    public void updateHomeAddress(final ProfileHomeAddressDTO homeAddressDTO) {
        final HomeAddress homeAddress = entityManager.find(HomeAddress.class, homeAddressDTO.id());
        homeAddress.setAddress(homeAddressDTO.address());
        homeAddress.setCity(homeAddressDTO.city());
        homeAddress.setState(homeAddressDTO.state());
        homeAddress.setZipcode(homeAddressDTO.zipcode());
        entityManager.merge(homeAddress);
    }

    @Transactional
    public void removeHomeAddress(final int homeAddressId) {
        final HomeAddress homeAddress = entityManager.find(HomeAddress.class, homeAddressId);
        homeAddress.getCustomer().setHomeAddress(null);
        entityManager.merge(homeAddress.getCustomer());
        entityManager.remove(homeAddress);
    }
}
