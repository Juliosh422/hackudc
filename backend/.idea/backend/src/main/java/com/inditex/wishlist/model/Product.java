package com.inditex.wishlist.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Product {

    private String id;
    private String name;
    private Price price;
    private String link;
    private String brand;

    public Product(String id, String name, Price price, String link, String brand) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.link = link;
        this.brand = brand;
    }
}
