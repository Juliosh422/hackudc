package com.inditex.visualsearch.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class InditexApiClient {

    @Value("${spring.security.oauth2.client.registration.inditex.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.inditex.client-secret}")
    private String clientSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getAccessToken() {
        String url = "https://api.inditex.com/authenticate";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body = "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        return response.getBody(); // Aquí parsear el token de la respuesta
    }

    public ResponseEntity<String> searchProducts(String imageUrl) {
        String token = getAccessToken();
        String apiUrl = "https://api.inditex.com/pubvsearch/products?image=" + imageUrl;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);
    }
}
