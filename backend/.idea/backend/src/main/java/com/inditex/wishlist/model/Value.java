package com.inditex.wishlist.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Value {

    private double current;

    public Value(double current) {
        this.current = current;
    }
}
