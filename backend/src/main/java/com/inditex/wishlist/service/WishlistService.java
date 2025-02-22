package com.inditex.wishlist.service;

import com.inditex.wishlist.model.Wishlist;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistStorageService storageService;
    private List<Wishlist> wishlists;

    @PostConstruct
    public void init() {
        wishlists = storageService.loadWishlists();
        if (wishlists == null) {
            wishlists = new ArrayList<>();
        }
    }

    public List<Wishlist> getAllWishlists() {
        return wishlists;
    }

    public Optional<Wishlist> getWishlistById(String id) {
        return wishlists.stream()
                .filter(w -> w.getId().equals(id))
                .findFirst();
    }

    public void addWishlist(Wishlist wishlist) {
        wishlist.setId(UUID.randomUUID().toString());
        wishlists.add(wishlist);
        storageService.saveWishlists(wishlists);
    }

    public void removeWishlist(String id) {
        wishlists.removeIf(w -> w.getId().equals(id));
        storageService.saveWishlists(wishlists);
    }
}