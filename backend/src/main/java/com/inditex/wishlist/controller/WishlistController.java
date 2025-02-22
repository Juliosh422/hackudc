package com.inditex.wishlist.controller;

import com.inditex.wishlist.model.Product;
import com.inditex.wishlist.model.Wishlist;
import com.inditex.wishlist.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    // Obtener la wishlist completa
    @GetMapping
    public Wishlist getWishlist() {
        return wishlistService.getWishlist();
    }

    // Añadir un producto
    @PostMapping("/products")
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        wishlistService.addProduct(product);
        return ResponseEntity.ok("Producto añadido a la wishlist");
    }

    // Eliminar un producto por ID
    @DeleteMapping("/products/{productId}")
    public ResponseEntity<String> removeProduct(@PathVariable String productId) {
        wishlistService.removeProduct(productId);
        return ResponseEntity.ok("Producto eliminado de la wishlist");
    }

    // Vaciar toda la wishlist
    @DeleteMapping
    public ResponseEntity<String> clearWishlist() {
        wishlistService.clearWishlist();
        return ResponseEntity.ok("Wishlist vaciada");
    }
}