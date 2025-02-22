package com.inditex.wishlist.controller;

import com.inditex.wishlist.model.Wishlist;
import com.inditex.wishlist.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wishlists")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public List<Wishlist> getAllWishlists() {
        return wishlistService.getAllWishlists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Wishlist> getWishlistById(@PathVariable String id) {
        Optional<Wishlist> wishlist = wishlistService.getWishlistById(id);
        return wishlist.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> addWishlist(@RequestBody Wishlist wishlist) {
        wishlistService.addWishlist(wishlist);
        return ResponseEntity.ok("Wishlist añadida con éxito");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeWishlist(@PathVariable String id) {
        wishlistService.removeWishlist(id);
        return ResponseEntity.ok("Wishlist eliminada con éxito");
    }
}
