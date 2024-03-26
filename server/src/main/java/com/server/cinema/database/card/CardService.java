package com.server.cinema.database.card;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.card.dto.CardDTOCustomerId;
import com.server.cinema.database.card.dto.CardDTOCardId;
import com.server.cinema.database.customer.Customer;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class CardService {

    private final EntityManager entityManager;

    @Autowired
    public CardService(final EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public void addCard(final CardDTOCustomerId cardDTO) {
        final String cardNumber = cardDTO.cardNumber();
        final String encryptedCardNumber = BCrypt.hashpw(cardNumber, BCrypt.gensalt());
        Customer customer = entityManager.find(Customer.class, cardDTO.customerId());

        final Card card = new Card(
                cardDTO.cardType(),
                encryptedCardNumber,
                formatExpirationDate(cardDTO.expirationDate()),
                cardDTO.billingAddress(),
                cardNumber.substring(cardNumber.length() - 4),
                customer);
        customer.getCards().add(card);
    }

    private static String formatExpirationDate(String expirationDate) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("MM/yyyy/dd");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(expirationDate + "/01", inputFormatter);
        return date.format(outputFormatter);
    }

    @Transactional
    public List<CardDTOCardId> getCards(final int customerId) {
        final Customer customer = entityManager.find(Customer.class, customerId);
        return customer.getCards().stream().map((final Card card) -> new CardDTOCardId(
                card.getId(),
                card.getCardType(),
                card.getExpirationDate(),
                card.getBillingAddress(),
                card.getLastFourDigits()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateCard(final CardDTOCardId cardDTO) {
        final Card card = entityManager.find(Card.class, cardDTO.id());
        card.setCardType(cardDTO.cardType());
        card.setExpirationDate(formatExpirationDate(cardDTO.expirationDate()));
        card.setBillingAddress(cardDTO.billingAddress());
        entityManager.merge(card);
    }

    @Transactional
    public void deleteCard(final int cardId) {
        final Card card = entityManager.find(Card.class, cardId);
        card.getCustomer().getCards().remove(card);
        entityManager.merge(card.getCustomer());
        entityManager.remove(card);
    }
}
