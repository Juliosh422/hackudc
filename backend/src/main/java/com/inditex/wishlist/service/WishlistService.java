package com.inditex.wishlist.service;

import com.inditex.wishlist.model.Product;
import com.inditex.wishlist.model.Wishlist;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistStorageService storageService;
    private Wishlist wishlist; // Ahora es un objeto, no una lista

    @PostConstruct
    public void init() {
        wishlist = storageService.loadWishlist();
        if (wishlist.getProducts() == null) {
            wishlist.setProducts(new ArrayList<>());
        }
    }

    // Obtener la wishlist completa
    public Wishlist getWishlist() {
        return wishlist;
    }

    // Añadir un producto a la wishlist
    public void addProduct(Product product) {
        product.setId(UUID.randomUUID().toString()); // Genera ID único para el producto
        wishlist.getProducts().add(product);
        storageService.saveWishlist(wishlist);
    }

    // Eliminar un producto por su ID
    public void removeProduct(String productId) {
        wishlist.getProducts().removeIf(p -> p.getId().equals(productId));
        storageService.saveWishlist(wishlist);
    }

    // Vaciar toda la wishlist
    public void clearWishlist() {
        wishlist.getProducts().clear();
        storageService.saveWishlist(wishlist);
    }
}