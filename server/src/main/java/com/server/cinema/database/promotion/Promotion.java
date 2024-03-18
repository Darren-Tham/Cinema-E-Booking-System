package com.server.cinema.database.promotion;

import org.springframework.context.annotation.EnableAspectJAutoProxy;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EnableAspectJAutoProxy
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column(nullable = false)
    private int discountPercentage;

    @Column(nullable = false)
    private String discountCode;

    @Column(columnDefinition = "DATE", nullable = false)
    private String startDate;

    @Column(columnDefinition = "DATE", nullable = false)
    private String endDate;

}
