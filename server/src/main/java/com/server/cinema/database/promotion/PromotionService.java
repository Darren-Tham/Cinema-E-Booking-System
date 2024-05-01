package com.server.cinema.database.promotion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        final Promotion promotion = new Promotion(promotionDTO.name(), promotionDTO.discountCode(),
                promotionDTO.discountPercentage(), promotionDTO.startDate(), promotionDTO.endDate());
        promotionRepository.save(promotion);
    }

}
