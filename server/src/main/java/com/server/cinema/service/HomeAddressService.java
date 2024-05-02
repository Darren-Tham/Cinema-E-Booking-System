package com.server.cinema.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.CustomerHomeAddressDTO;
import com.server.cinema.dto.ProfileHomeAddressDTO;
import com.server.cinema.entity.Customer;
import com.server.cinema.entity.HomeAddress;
import com.server.cinema.repository.CustomerRepository;
import com.server.cinema.repository.HomeAddressRepository;

@Service
public class HomeAddressService {

    private final HomeAddressRepository homeAddressRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public HomeAddressService(final HomeAddressRepository homeAddressRepository,
            final CustomerRepository customerRepository) {
        this.homeAddressRepository = homeAddressRepository;
        this.customerRepository = customerRepository;
    }

    public void addHomeAddress(final CustomerHomeAddressDTO homeAddressDTO) {
        final Customer customer = customerRepository.findById(homeAddressDTO.customerId()).orElseThrow();
        final HomeAddress homeAddress = new HomeAddress();
        homeAddress.setAddress(homeAddressDTO.address());
        homeAddress.setCity(homeAddressDTO.city());
        homeAddress.setState(homeAddressDTO.state());
        homeAddress.setZipcode(homeAddressDTO.zipcode());
        homeAddress.setCustomer(customer);
        homeAddressRepository.save(homeAddress);
    }

    public ProfileHomeAddressDTO getHomeAddress(final int customerId) {
        final HomeAddress homeAddress = homeAddressRepository.findByCustomerId(customerId).orElseThrow();
        return new ProfileHomeAddressDTO(
                homeAddress.getId(),
                homeAddress.getAddress(),
                homeAddress.getCity(),
                homeAddress.getState(),
                homeAddress.getZipcode());
    }

    public void updateHomeAddress(final ProfileHomeAddressDTO homeAddressDTO) {
        final HomeAddress homeAddress = homeAddressRepository.findById(homeAddressDTO.id()).orElseThrow();
        homeAddress.setAddress(homeAddressDTO.address());
        homeAddress.setCity(homeAddressDTO.city());
        homeAddress.setState(homeAddressDTO.state());
        homeAddress.setZipcode(homeAddressDTO.zipcode());
        homeAddressRepository.save(homeAddress);
    }

    public void removeHomeAddress(final int homeAddressId) {
        homeAddressRepository.deleteById(homeAddressId);
    }
}
