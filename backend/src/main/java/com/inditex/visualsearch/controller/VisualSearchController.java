package com.inditex.visualsearch.controller;

import com.inditex.visualsearch.client.InditexApiClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
public class VisualSearchController {

    private final InditexApiClient inditexApiClient;

    public VisualSearchController(InditexApiClient inditexApiClient) {
        this.inditexApiClient = inditexApiClient;
    }

    @GetMapping
    public ResponseEntity<String> search(@RequestParam String imageUrl) {
        return inditexApiClient.searchProducts(imageUrl);
    }
}
