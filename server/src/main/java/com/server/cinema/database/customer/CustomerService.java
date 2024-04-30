package com.server.cinema.database.customer;

import java.util.List;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.cinema.database.customer.dao.CustomerDAO;
import com.server.cinema.database.customer.dto.InactiveCustomerDTO;
import com.server.cinema.database.customer.dto.CustomerDTO;
import com.server.cinema.database.customer.enums.UserState;
import com.server.cinema.database.customer.exception.CustomerNotFoundException;
import com.server.cinema.database.customer.exception.LoginCredentialsInvalidException;

import jakarta.persistence.EntityManager;

@Service
public class CustomerService {

    private final CustomerDAO customerDAO;
    private final EntityManager entityManager;

    @Autowired
    public CustomerService(final CustomerDAO customerDAO, final EntityManager entityManager) {
        this.customerDAO = customerDAO;
        this.entityManager = entityManager;
    }

    public List<String> getSubscribedCustomerEmails() {
        return customerDAO.findSubscribedCustomers()
                .stream()
                .map(Customer::getEmail)
                .collect(Collectors.toList());
    }

    public String getFirstNameByCustomerId(final int customerId) {
        final Customer customer = entityManager.find(Customer.class, customerId);
        return customer.getFirstName();
    }

    public String getLastNameByCustomerId(final int customerId) {
        final Customer customer = entityManager.find(Customer.class, customerId);
        return customer.getLastName();
    }

    public String getPhoneNumberByCustomerId(final int customerId) {
        final Customer customer = entityManager.find(Customer.class, customerId);
        return customer.getPhoneNumber();
    }

    public boolean isSubscribedForPromotions(final int customerId) {
        final Customer customer = entityManager.find(Customer.class, customerId);
        return customer.isSubscribedForPromotions();
    }

    public UserState getStatus(final int customerId) {
        final Customer customer = entityManager.find(Customer.class, customerId);
        return customer.getStatus();
    }

    public String getEmailByCustomerId(final int customerId) {
        Customer customer = entityManager.find(Customer.class, customerId);
        return customer.getEmail();
    }

    public boolean emailExists(final String email) {
        return customerDAO.emailExists(email);
    }

    public int addInactiveCustomer(final InactiveCustomerDTO customerDTO) {
        final String encryptedPassword = BCrypt.hashpw(customerDTO.password(), BCrypt.gensalt());
        Customer customer = new Customer(
                customerDTO.firstName(),
                customerDTO.lastName(),
                customerDTO.email(),
                encryptedPassword,
                customerDTO.phoneNumber(),
                UserState.INACTIVE,
                customerDTO.isSubscribedForPromotions());
        return customerDAO.addInactiveCustomer(customer);
    }

    public int getCustomerIdByEmail(final String email) {
        return customerDAO
                .getCustomerByEmail(email).orElseThrow(
                        () -> new CustomerNotFoundException(
                                String.format("Customer with email `%s` does not exist.", email)))
                .getId();
    }

    public boolean isValidPassword(final int customerId, final String password) {
        final Customer customer = entityManager.find(Customer.class, customerId);
        return BCrypt.checkpw(password, customer.getEncryptedPassword());
    }

    public CustomerDTO getCustomerByEmailAndPassword(final String email, final String password) {
        final Customer customer = customerDAO.getCustomerByEmail(email)
                .orElseThrow(() -> new CustomerNotFoundException(
                        String.format("Customer with email `%s` does not exist.", email)));
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
            throw new LoginCredentialsInvalidException("Email or password credential is incorrect.");
        }
    }

    @Transactional
    public void setStatusToActive(final int customerId) {
        Customer customer = entityManager.find(Customer.class, customerId);
        customer.setStatus(UserState.ACTIVE);
        entityManager.merge(customer);
    }

    @Transactional
    public void changePassword(final int customerId, final String password) {
        final String encryptedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        Customer customer = entityManager.find(Customer.class, customerId);
        customer.setEncryptedPassword(encryptedPassword);
        entityManager.merge(customer);
    }

    @Transactional
    public void changeFirstName(final int customerId, final String firstName) {
        Customer customer = entityManager.find(Customer.class, customerId);
        customer.setFirstName(firstName);
        entityManager.merge(customer);
    }

    @Transactional
    public void changeLastName(final int customerId, final String lastName) {
        Customer customer = entityManager.find(Customer.class, customerId);
        customer.setLastName(lastName);
        entityManager.merge(customer);
    }

    @Transactional
    public void changePhoneNumber(final int customerId, final String phoneNumber) {
        Customer customer = entityManager.find(Customer.class, customerId);
        customer.setPhoneNumber(phoneNumber);
        entityManager.merge(customer);
    }

    @Transactional
    public void changeSubscribedForPromotions(final int customerId, final boolean isSubscribedForPromotions) {
        Customer customer = entityManager.find(Customer.class, customerId);
        customer.setSubscribedForPromotions(isSubscribedForPromotions);
        entityManager.merge(customer);
    }
}
