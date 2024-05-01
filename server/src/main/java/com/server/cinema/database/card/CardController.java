package com.server.cinema.database.card;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.database.card.dto.CustomerCardDTO;
import com.server.cinema.database.card.dto.ProfileCardDTO;

@CrossOrigin
@RestController
@RequestMapping("api/cards")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(final CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/add")
    public void addCard(@RequestBody final CustomerCardDTO card) {
        cardService.addCard(card);
    }

    @GetMapping("/{customerId}")
    public List<ProfileCardDTO> getCustomerCards(@PathVariable final int customerId) {
        return cardService.getCustomerCards(customerId);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCard(@RequestBody final ProfileCardDTO card) {
        cardService.updateCard(card);
        return ResponseEntity.ok("Card successfully updated.");
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<String> deleteCard(@PathVariable final int cardId) {
        cardService.deleteCard(cardId);
        return ResponseEntity.ok("Card successfully deleted.");
    }

}
