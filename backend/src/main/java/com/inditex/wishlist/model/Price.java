package com.inditex.wishlist.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Price {

    private String currency;
    private Value value;

    public Price(String currency, Value value) {
        this.currency = currency;
        this.value = value;
    }
}
