package com.inditex.visualsearch.client;

import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import java.util.Base64;

@Service
public class InditexAuthClient {

    private static final String AUTH_URL = "https://auth.inditex.com:443/openam/oauth2/itxid/itxidmp/sandbox/access_token";
    private static final String CLIENT_ID = "oauth-mkpsbox-oauthgfnthzeijxojqexifhsnbxpro";
    private static final String CLIENT_SECRET = "*IK.8S:WEo4oG[Hu";
    private final RestTemplate restTemplate = new RestTemplate();

    public String getAccessToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String basicAuth = Base64.getEncoder().encodeToString((CLIENT_ID + ":" + CLIENT_SECRET).getBytes());
        headers.set("Authorization", "Basic " + basicAuth);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");
        body.add("scope", "technology.catalog.read");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(AUTH_URL, request, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            // Extraer el token desde el JSON devuelto
            JSONObject jsonResponse = new JSONObject(response.getBody());
            return jsonResponse.getString("access_token");
        } else {
            throw new RuntimeException("Error al obtener el token: " + response.getBody());
        }
    }
}
