package com.inditex.visualsearch.client;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Collections;
import java.util.Map;

@Service
public class InditexApiClient {

    private static final String TOKEN_URL = "https://auth.inditex.com:443/openam/oauth2/itxid/itxidmp/access_token";
    private static final String CLIENT_ID = "oauth-mkplace-oauthzqbuyihxwhmfvdtvizpropro";
    private static final String CLIENT_SECRET = "~dRzP3bw/f/Zj35~"; // Asegúrate de guardarlo de forma segura

    private final RestTemplate restTemplate = new RestTemplate();

    private String getAccessToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(CLIENT_ID, CLIENT_SECRET);
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

        String body = "grant_type=client_credentials&scope=technology.catalog.read";

        HttpEntity<String> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(TOKEN_URL, HttpMethod.POST, request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return (String) response.getBody().get("id_token");
        }

        throw new RuntimeException("Error obteniendo token OAuth2");
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
