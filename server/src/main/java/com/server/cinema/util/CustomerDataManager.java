package com.server.cinema.util;

import java.util.HashSet;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.server.cinema.database.card.Card;
import com.server.cinema.database.customer.Customer;
import com.server.cinema.database.customer.CustomerRepository;
import com.server.cinema.database.customer.enums.UserState;
import com.server.cinema.database.home_address.HomeAddress;
import com.server.cinema.util.interfaces.InitRunnable;

@Component
public class CustomerDataManager
        implements InitRunnable {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerDataManager(final CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void init() {
        final String email = "darrent9859@gmail.com";
        if (customerRepository.findByEmail(email).isPresent()) {
            return;
        }

        final String encryptedPassword = BCrypt.hashpw("swe", BCrypt.gensalt());
        final String encryptedCardNumber = BCrypt.hashpw("5555555555555555", BCrypt.gensalt());
        final Customer customer = new Customer(
                "Darren",
                "Thammavong",
                email,
                encryptedPassword,
                "6789252555",
                UserState.ACTIVE,
                true);
        final Card card = new Card("Visa", encryptedCardNumber, "2026/12/01", "123 Example St.", "5555", customer);
        final HomeAddress homeAddress = new HomeAddress("123 Example St.", "Example City", "Georgia", "55555",
                customer);
        customer.setCards(new HashSet<>());
        customer.getCards().add(card);
        customer.setHomeAddress(homeAddress);
        customerRepository.save(customer);
    }

}
