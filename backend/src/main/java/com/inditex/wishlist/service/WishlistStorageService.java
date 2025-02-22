package com.inditex.wishlist.service;

import com.inditex.wishlist.model.Wishlist;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inditex.wishlist.model.Wishlist;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class WishlistStorageService {

    private final String FILE_PATH = "wishlists.json";
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Cargar wishlists desde el archivo JSON
    public List<Wishlist> loadWishlists() {
        try {
            File file = new File(FILE_PATH);
            if (!file.exists()) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(file, new TypeReference<List<Wishlist>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    // Guardar wishlists en el archivo JSON
    public void saveWishlists(List<Wishlist> wishlists) {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(FILE_PATH), wishlists);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
