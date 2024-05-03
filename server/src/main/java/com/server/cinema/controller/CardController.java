package com.server.cinema.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.dto.CustomerCardDTO;
import com.server.cinema.dto.ProfileCardDTO;
import com.server.cinema.service.CardService;

@CrossOrigin
@RestController
@RequestMapping("api/cards")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(final CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/{cardId}")
    public ProfileCardDTO getCardById(@PathVariable final int cardId) {
        return cardService.getCardById(cardId);
    }

    @PostMapping("/add")
    public void addCard(@RequestBody final CustomerCardDTO card) {
        cardService.addCard(card);
    }

    @GetMapping("/customer/{customerId}")
    public List<ProfileCardDTO> getCustomerCards(@PathVariable final int customerId) {
        return cardService.getCustomerCards(customerId);
    }

    @PutMapping("/update")
    public void updateCard(@RequestBody final ProfileCardDTO card) {
        cardService.updateCard(card);
    }

    @DeleteMapping("/{cardId}")
    public void deleteCard(@PathVariable final int cardId) {
        cardService.deleteCard(cardId);
    }

}
