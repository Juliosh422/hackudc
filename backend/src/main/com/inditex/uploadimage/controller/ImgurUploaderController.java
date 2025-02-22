package main.com.inditex.uploadimage.controller;

import main.com.inditex.uploadimage.service.ImgurUploaderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/upload")
public class ImgurUploaderController {

    private final ImgurUploaderService imgurUploaderService;

    public ImgurUploaderController(ImgurUploaderService imgurUploaderService) {
        this.imgurUploaderService = imgurUploaderService;
    }

    @PostMapping("/image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Guardar el archivo temporalmente
            File tempFile = File.createTempFile("upload-", file.getOriginalFilename());
            file.transferTo(tempFile);

            // Subir la imagen a Imgur y obtener la URL
            String imageUrl = imgurUploaderService.uploadImage(tempFile);

            // Eliminar el archivo temporal
            tempFile.delete();

            // Crear la respuesta en formato JSON
            Map<String, String> response = new HashMap<>();
            response.put("imageUrl", imageUrl);

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            // En caso de error, devolver un JSON con el mensaje de error
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error al subir la imagen");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}
