package com.server.cinema.database.customer;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.customer.dao.CustomerDAO;
import com.server.cinema.database.customer.enums.UserState;

@Service
public class CustomerService {

    private final CustomerDAO customerDAO;

    @Autowired
    public CustomerService(final CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
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

}
