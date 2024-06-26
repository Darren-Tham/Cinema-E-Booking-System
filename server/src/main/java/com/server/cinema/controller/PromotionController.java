package com.server.cinema.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.dto.PromotionDTO;
import com.server.cinema.service.PromotionService;

@CrossOrigin
@RestController
@RequestMapping("api/promotions")
public class PromotionController {

    private final PromotionService promotionService;

    @Autowired
    public PromotionController(final PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @GetMapping("/{discountCode}")
    public PromotionDTO getPromotion(@PathVariable final String discountCode) {
        return promotionService.getPromotion(discountCode);
    }

    @GetMapping("/{discountCode}/check")
    public boolean discountCodeExists(@PathVariable final String discountCode) {
        return promotionService.discountCodeExists(discountCode);
    }

    @PostMapping("/add")
    public void addPromotion(@RequestBody final PromotionDTO promotion) {
        promotionService.addPromotion(promotion);
    }

}
