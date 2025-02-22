package com.inditex.uploadimage.service;

import okhttp3.*;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Service
public class ImgurUploaderService {

    private static final String CLIENT_ID = "753ebf4e7510ed5";
    private static final String IMGUR_API_URL = "https://api.imgur.com/3/image";
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    private final OkHttpClient client = new OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .build();

    public String uploadImage(File imageFile) throws IOException {
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("image", imageFile.getName(),
                        RequestBody.create(imageFile, MediaType.parse("image/jpeg")))
                .build();

        Request request = new Request.Builder()
                .url("https://api.imgur.com/3/image") // Actualiza el endpoint si es necesario
                .header("Authorization", "Client-ID " + CLIENT_ID)
                .post(requestBody)
                .build();

        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body().string();
            if (!response.isSuccessful()) {
                throw new IOException("Error en la respuesta: " + responseBody);
            }
            JSONObject jsonResponse = new JSONObject(responseBody);
            return jsonResponse.getJSONObject("data").getString("link");
        }
    }

    private MediaType resolveMediaType(File file) {
        String fileName = file.getName().toLowerCase();
        if (fileName.endsWith(".png")) return MediaType.parse("image/png");
        if (fileName.endsWith(".gif")) return MediaType.parse("image/gif");
        if (fileName.endsWith(".webp")) return MediaType.parse("image/webp");
        if (fileName.endsWith(".jpeg") || fileName.endsWith(".jpg")) return MediaType.parse("image/jpeg");
        return MediaType.parse("application/octet-stream");
    }

    private String extractImageUrl(String jsonResponse) throws IOException {
        try {
            JSONObject obj = new JSONObject(jsonResponse);
            return obj.getJSONObject("data").getString("link");
        } catch (JSONException e) {
            throw new IOException("Respuesta inválida de Imgur", e);
        }
    }
}