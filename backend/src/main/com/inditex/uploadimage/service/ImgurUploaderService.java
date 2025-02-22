package main.com.inditex.uploadimage.service;

import okhttp3.*;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;

@Service
public class ImgurUploaderService {
    private static final String CLIENT_ID = "TU_CLIENT_ID"; // Reemplaza con tu Client ID de Imgur
    private static final String IMGUR_UPLOAD_URL = "https://api.imgur.com/3/upload";

    private final OkHttpClient client = new OkHttpClient();

    public String uploadImage(File imageFile) throws IOException {
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("image", imageFile.getName(),
                        RequestBody.create(imageFile, MediaType.parse("image/jpeg")))
                .build();

        Request request = new Request.Builder()
                .url(IMGUR_UPLOAD_URL)
                .header("Authorization", "Client-ID " + CLIENT_ID)
                .post(requestBody)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Error en la respuesta: " + response.body().string());
            }
            JSONObject jsonResponse = new JSONObject(response.body().string());
            return jsonResponse.getJSONObject("data").getString("link");
        }
    }
}
