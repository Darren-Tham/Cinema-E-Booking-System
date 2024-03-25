package com.server.cinema.database.card;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.database.card.dto.CardDTO;
import com.server.cinema.database.card.dto.CardDTONoId;

@CrossOrigin
@RestController
@RequestMapping("api/card")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(final CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCard(@RequestBody final CardDTO card) {
        cardService.addCard(card);
        return new ResponseEntity<>("Card successfully added.", HttpStatus.CREATED);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<List<CardDTONoId>> getCards(@PathVariable final int customerId) {
        final List<CardDTONoId> cards = cardService.getCards(customerId);
        return ResponseEntity.ok(cards);
    }

}
