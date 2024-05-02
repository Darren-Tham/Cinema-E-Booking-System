package com.server.cinema.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.CustomerDTO;
import com.server.cinema.dto.NewCustomerDTO;
import com.server.cinema.entity.Customer;
import com.server.cinema.enums.UserState;
import com.server.cinema.repository.CustomerRepository;

import jakarta.persistence.EntityManager;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(final EntityManager entityManager, final CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<String> getSubscribedCustomerEmails() {
        return customerRepository
                .findAll()
                .stream()
                .filter(Customer::isSubscribedForPromotions)
                .map(Customer::getEmail)
                .collect(Collectors.toList());
    }

    public String getCustomerFirstName(final int customerId) {
        return customerRepository.findById(customerId).orElseThrow().getFirstName();
    }

    public String getCustomerLastName(final int customerId) {
        return customerRepository.findById(customerId).orElseThrow().getLastName();
    }

    public String getCustomerPhoneNumber(final int customerId) {
        return customerRepository.findById(customerId).orElseThrow().getPhoneNumber();
    }

    public boolean isCustomerSubscribedForPromotions(final int customerId) {
        return customerRepository.findById(customerId).orElseThrow().isSubscribedForPromotions();
    }

    public UserState getStatus(final int customerId) {
        return customerRepository.findById(customerId).orElseThrow().getStatus();
    }

    public String getCustomerEmail(final int customerId) {
        return customerRepository.findById(customerId).orElseThrow().getEmail();
    }

    public boolean customerEmailExists(final String email) {
        return customerRepository.findByEmail(email).isPresent();
    }

    public int addCustomer(final NewCustomerDTO customerDTO) {
        final String encryptedPassword = BCrypt.hashpw(customerDTO.password(), BCrypt.gensalt());
        final Customer customer = new Customer();
        customer.setFirstName(customerDTO.firstName());
        customer.setLastName(customerDTO.lastName());
        customer.setEmail(customerDTO.email());
        customer.setEncryptedPassword(encryptedPassword);
        customer.setPhoneNumber(customerDTO.phoneNumber());
        customer.setStatus(UserState.INACTIVE);
        customer.setSubscribedForPromotions(customerDTO.isSubscribedForPromotions());
        return customerRepository.save(customer).getId();
    }

    public int getCustomerIdByEmail(final String email) {
        return customerRepository.findByEmail(email).orElseThrow().getId();
    }

    public boolean customerPasswordIsValid(final int customerId, final String password) {
        final Customer customer = customerRepository.findById(customerId).orElseThrow();
        return BCrypt.checkpw(password, customer.getEncryptedPassword());
    }

    public CustomerDTO getCustomer(final String email, final String password) {
        final Customer customer = customerRepository.findByEmail(email).orElseThrow();
        if (BCrypt.checkpw(password, customer.getEncryptedPassword())) {
            return new CustomerDTO(
                    customer.getId(),
                    customer.getFirstName(),
                    customer.getLastName(),
                    customer.getEmail(),
                    customer.getPhoneNumber(),
                    customer.getStatus(),
                    customer.isSubscribedForPromotions());
        } else {
            throw new NoSuchElementException();
        }
    }

    public void updateCustomerStatusToActive(final int customerId) {
        final Customer customer = customerRepository.findById(customerId).orElseThrow();
        customer.setStatus(UserState.ACTIVE);
        customerRepository.save(customer);
    }

    public void updateCustomerPassword(final int customerId, final String password) {
        final String encryptedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        final Customer customer = customerRepository.findById(customerId).orElseThrow();
        customer.setEncryptedPassword(encryptedPassword);
        customerRepository.save(customer);
    }

    public void updateCustomerFirstName(final int customerId, final String firstName) {
        final Customer customer = customerRepository.findById(customerId).orElseThrow();
        customer.setFirstName(firstName);
        customerRepository.save(customer);
    }

    public void updateCustomerLastName(final int customerId, final String lastName) {
        final Customer customer = customerRepository.findById(customerId).orElseThrow();
        customer.setLastName(lastName);
        customerRepository.save(customer);
    }

    public void updateCustomerPhoneNumber(final int customerId, final String phoneNumber) {
        final Customer customer = customerRepository.findById(customerId).orElseThrow();
        customer.setPhoneNumber(phoneNumber);
        customerRepository.save(customer);
    }

    public void updateCustomerSubscribedForPromotions(final int customerId, final boolean isSubscribedForPromotions) {
        final Customer customer = customerRepository.findById(customerId).orElseThrow();
        customer.setSubscribedForPromotions(isSubscribedForPromotions);
        customerRepository.save(customer);
    }
}
