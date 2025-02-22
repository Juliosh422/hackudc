package com.inditex.wishlist.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inditex.wishlist.model.Wishlist;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;


@Service
public class WishlistStorageService {
    private final String FILE_PATH = "wishlist.json"; // Nombre singular
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Wishlist loadWishlist() {
        try {
            File file = new File(FILE_PATH);
            if (!file.exists()) {
                return new Wishlist(); // Retorna una wishlist vacía
            }
            return objectMapper.readValue(file, Wishlist.class); // Lee un objeto Wishlist
        } catch (IOException e) {
            e.printStackTrace();
            return new Wishlist();
        }
    }

    public void saveWishlist(Wishlist wishlist) {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(FILE_PATH), wishlist);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}