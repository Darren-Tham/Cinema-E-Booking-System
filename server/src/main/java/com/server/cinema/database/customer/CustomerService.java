package com.server.cinema.database.customer;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.cinema.database.customer.dao.CustomerDAO;
import com.server.cinema.database.customer.enums.UserState;

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
                .getCustomerIdByEmail(email).orElseThrow(
                        () -> new CustomerNotFoundException(
                                String.format("Customer with email `%s` does not exist.", email)))
                .getId();
    }

    @Transactional
    public void setStatusToActive(final int customerId) {
        Customer customer = entityManager.find(Customer.class, customerId);
        customer.setStatus(UserState.ACTIVE);
        entityManager.merge(customer);
    }

}
