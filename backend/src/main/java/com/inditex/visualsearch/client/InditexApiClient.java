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

        String body = "grant_type=client_credentials&client_id=" + "oauth-mkplace-oauthzqbuyihxwhmfvdtvizpropro" + "&client_secret=" + "~dRzP3bw/f/Zj35~";
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        return response.getBody(); // Aquí parsear el token de la respuesta
    }

    public ResponseEntity<String> searchProducts(String imageUrl) {
        String token = "https://auth.inditex.com:443/openam/oauth2/itxid/itxidmp/access_token";
        String apiUrl = "https://api.inditex.com/pubvsearch/products?image=" + "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tous.com%2Fes-es%2Fcamiseta-de-manga-corta-negra-tous-mos-bears-lam%2Fp%2F295902506&psig=AOvVaw3emu-OI1ctpG1h9UBZGrkn&ust=1740272089389000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjGgu-I1osDFQAAAAAdAAAAABAI";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);
    }
}
