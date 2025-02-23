package com.inditex.googleimagesearch.controller;

import com.inditex.googleimagesearch.service.GoogleImageSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/images")
public class ImageSearchController {

    @Autowired
    private GoogleImageSearch googleImageSearch;

    @GetMapping("/search")
    public ResponseEntity<String> searchImage(@RequestParam String query) {
        try {
            String imageUrl = GoogleImageSearch.getImageFromGoogle(query);
            if (imageUrl != null) {
                return ResponseEntity.ok(imageUrl);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron resultados");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al buscar la imagen: " + e.getMessage());
        }
    }
}