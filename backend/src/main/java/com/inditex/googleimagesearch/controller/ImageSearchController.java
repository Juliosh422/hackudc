package com.inditex.googleimagesearch.controller;

import com.inditex.googleimagesearch.service.GoogleImageSearch;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageSearchController {

    @GetMapping("/searchImage")
    public String searchImage(
            @RequestParam String query,
            @RequestParam String apiKey,
            @RequestParam String cx) {
        try {
            String imageUrl = GoogleImageSearch.getImageFromGoogle(query, apiKey, cx);
            System.out.println(imageUrl);
            return (imageUrl != null) ? imageUrl : "No se encontraron resultados";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
