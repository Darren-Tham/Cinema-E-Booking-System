package com.server.cinema.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.PromotionDTO;
import com.server.cinema.entity.Promotion;
import com.server.cinema.repository.PromotionRepository;

@Service
public class PromotionService {

    private final PromotionRepository promotionRepository;

    @Autowired
    public PromotionService(final PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    public boolean discountCodeExists(final String discountCode) {
        return promotionRepository.findByDiscountCode(discountCode).isPresent();
    }

    public void addPromotion(final PromotionDTO promotionDTO) {
        final Promotion promotion = new Promotion();
        promotion.setName(promotionDTO.name());
        promotion.setDiscountCode(promotionDTO.discountCode());
        promotion.setDiscountPercentage(promotionDTO.discountPercentage());
        promotion.setStartDate(promotionDTO.startDate());
        promotion.setEndDate(promotionDTO.endDate());
        promotionRepository.save(promotion);
    }

}
