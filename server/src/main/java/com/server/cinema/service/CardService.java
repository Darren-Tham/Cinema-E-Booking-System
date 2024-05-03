package com.server.cinema.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.CustomerCardDTO;
import com.server.cinema.dto.ProfileCardDTO;
import com.server.cinema.entity.Card;
import com.server.cinema.entity.Customer;
import com.server.cinema.repository.CardRepository;
import com.server.cinema.repository.CustomerRepository;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public CardService(final CardRepository cardRepository, final CustomerRepository customerRepository) {
        this.cardRepository = cardRepository;
        this.customerRepository = customerRepository;
    }

    public ProfileCardDTO getCardById(final int cardId) {
        return cardRepository
                .findById(cardId)
                .map(CardService::toProfileCardDTO)
                .orElseThrow();
    }

    public void addCard(final CustomerCardDTO cardDTO) {
        final String cardNumber = cardDTO.cardNumber();
        final String encryptedCardNumber = BCrypt.hashpw(cardNumber, BCrypt.gensalt());
        final Customer customer = customerRepository.findById(cardDTO.customerId()).orElseThrow();
        final Card card = new Card();
        card.setCardType(cardDTO.cardType());
        card.setEncryptedCardNumber(encryptedCardNumber);
        card.setExpirationDate(formatExpirationDate(cardDTO.expirationDate()));
        card.setBillingAddress(cardDTO.billingAddress());
        card.setLastFourDigits(cardNumber.substring(cardNumber.length() - 4));
        card.setCustomer(customer);
        cardRepository.save(card);
    }

    private static String formatExpirationDate(String expirationDate) {
        final DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("MM/yyyy/dd");
        final DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        final LocalDate date = LocalDate.parse(expirationDate + "/01", inputFormatter);
        return date.format(outputFormatter);
    }

    public List<ProfileCardDTO> getCustomerCards(final int customerId) {
        return cardRepository
                .findAllByCustomerId(customerId)
                .stream()
                .map(CardService::toProfileCardDTO)
                .collect(Collectors.toList());
    }

    public void updateCard(final ProfileCardDTO cardDTO) {
        final Card card = cardRepository.findById(cardDTO.id()).orElseThrow();
        card.setCardType(cardDTO.cardType());
        card.setExpirationDate(formatExpirationDate(cardDTO.expirationDate()));
        card.setBillingAddress(cardDTO.billingAddress());
        cardRepository.save(card);
    }

    public void deleteCard(final int cardId) {
        cardRepository.deleteById(cardId);
    }

    private static ProfileCardDTO toProfileCardDTO(final Card card) {
        return new ProfileCardDTO(
                card.getId(),
                card.getCardType(),
                card.getExpirationDate(),
                card.getBillingAddress(),
                card.getLastFourDigits());
    }
}
