package com.inditex.wishlist.service;

import com.inditex.wishlist.model.Wishlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class WishlistService {

    @Autowired
    private WishlistStorageService storageService;

    private List<Wishlist> wishlists;

    public WishlistService() {
        this.wishlists = storageService.loadWishlists();
    }

    public List<Wishlist> getAllWishlists() {
        return wishlists;
    }

    public Optional<Wishlist> getWishlistById(String id) {
        return wishlists.stream().filter(w -> w.getId().equals(id)).findFirst();
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
