package com.server.cinema.database.customer;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.cinema.database.customer.dao.CustomerDAO;
import com.server.cinema.database.customer.dto.InactiveCustomerDTO;
import com.server.cinema.database.customer.dto.LoginCustomerDTO;
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

    public LoginCustomerDTO getCustomerByEmailAndPassword(final String email, final String password) {
        Customer customer = customerDAO.getCustomerByEmail(email)
                .orElseThrow(() -> new CustomerNotFoundException(
                        String.format("Customer with email `%s` does not exist.", email)));
        if (BCrypt.checkpw(password, customer.getEncryptedPassword())) {
            return new LoginCustomerDTO(
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

}
