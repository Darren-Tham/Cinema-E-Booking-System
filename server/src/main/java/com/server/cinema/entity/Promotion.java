package com.server.cinema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String discountCode;

    @Column(nullable = false)
    private int discountPercentage;

    @Column(columnDefinition = "DATE", nullable = false)
    private String startDate;

    @Column(columnDefinition = "DATE", nullable = false)
    private String endDate;

}
