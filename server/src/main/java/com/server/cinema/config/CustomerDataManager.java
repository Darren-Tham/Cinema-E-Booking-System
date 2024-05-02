package com.server.cinema.config;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.server.cinema.entity.Card;
import com.server.cinema.entity.Customer;
import com.server.cinema.entity.HomeAddress;
import com.server.cinema.enums.UserState;
import com.server.cinema.repository.CardRepository;
import com.server.cinema.repository.CustomerRepository;
import com.server.cinema.repository.HomeAddressRepository;
import com.server.cinema.config.interfaces.InitRunnable;

@Component
public class CustomerDataManager
        implements InitRunnable {

    private final CustomerRepository customerRepository;
    private final HomeAddressRepository homeAddressRepository;
    private final CardRepository cardRepository;

    @Autowired
    public CustomerDataManager(
            final CustomerRepository customerRepository,
            final HomeAddressRepository homeAddressRepository,
            final CardRepository cardRepository) {
        this.customerRepository = customerRepository;
        this.homeAddressRepository = homeAddressRepository;
        this.cardRepository = cardRepository;
    }

    public void init() {
        final String email = "darrent9859@gmail.com";
        if (customerRepository.findByEmail(email).isPresent()) {
            return;
        }

        final String encryptedPassword = BCrypt.hashpw("swe", BCrypt.gensalt());
        final String encryptedCardNumber = BCrypt.hashpw("5555555555555555", BCrypt.gensalt());

        final Customer customer = new Customer();
        customer.setFirstName("Darren");
        customer.setLastName("Thammavong");
        customer.setEmail(email);
        customer.setEncryptedPassword(encryptedPassword);
        customer.setPhoneNumber("6789252555");
        customer.setStatus(UserState.ACTIVE);
        customer.setSubscribedForPromotions(true);
        customerRepository.save(customer);

        final Card card = new Card();
        card.setCardType("Visa");
        card.setEncryptedCardNumber(encryptedCardNumber);
        card.setExpirationDate("2026/12/01");
        card.setBillingAddress("123 Example St.");
        card.setLastFourDigits("5555");
        card.setCustomer(customer);
        cardRepository.save(card);

        final HomeAddress homeAddress = new HomeAddress();
        homeAddress.setAddress("123 Example St.");
        homeAddress.setCity("Example City");
        homeAddress.setState("Georgia");
        homeAddress.setZipcode("55555");
        homeAddress.setCustomer(customer);
        homeAddressRepository.save(homeAddress);

    }

}
