package com.inditex.visualsearch.dto;

import lombok.Data;

@Data
public class ProductDto {
    private String id;
    private String name;
    private PriceDto price;
    private String link;
    private String brand;
}
