package com.inditex.googleimagesearch.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import org.json.JSONArray;
import org.json.JSONObject;

public class GoogleImageSearch {

    public static String getImageFromGoogle(String query) throws IOException {
        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String urlString = "https://www.googleapis.com/customsearch/v1"
            + "?q=" + encodedQuery
            + "&key=AIzaSyCpETXaFFloAWcrud3N7JeXrk9uYZmG1nU"
            + "&cx=018be8702677740fa"
            + "&searchType=image"
            + "&num=1";

        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        int responseCode = conn.getResponseCode();
        if (responseCode == 200) {
            Scanner scanner = new Scanner(conn.getInputStream());
            StringBuilder response = new StringBuilder();
            while (scanner.hasNext()) {
                response.append(scanner.nextLine());
            }
            scanner.close();

            JSONObject jsonResponse = new JSONObject(response.toString());
            JSONArray items = jsonResponse.optJSONArray("items");
            if (items != null && items.length() > 0) {
                return items.getJSONObject(0).getString("link");
            }
        }
        return null;
    }
}
