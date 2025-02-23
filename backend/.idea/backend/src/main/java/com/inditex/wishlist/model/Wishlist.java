package com.inditex.wishlist.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Wishlist {

    private String id;
    private String name;
    private List<Product> products;

    public Wishlist(String id, String name, List<Product> products) {
        this.id = id;
        this.name = name;
        this.products = products;
    }
}

