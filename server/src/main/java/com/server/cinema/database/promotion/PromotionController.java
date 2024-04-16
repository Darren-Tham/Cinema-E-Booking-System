package com.server.cinema.database.promotion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/promotion")
public class PromotionController {

    private final PromotionService promotionService;

    @Autowired
    public PromotionController(final PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPromotion(@RequestBody final PromotionDTO promotion) {
        promotionService.addPromotion(promotion);
        return new ResponseEntity<>("Promotion has been successfully created.", HttpStatus.CREATED);
    }

}
