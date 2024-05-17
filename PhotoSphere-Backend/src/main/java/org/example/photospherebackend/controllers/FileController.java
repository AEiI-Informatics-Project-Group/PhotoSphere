package org.example.photospherebackend.controllers;

import com.amazonaws.services.s3.model.S3Object;
import org.example.photospherebackend.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/files")
public class FileController {

    @Autowired
    private S3Service s3Service;

    @GetMapping
    public String listFiles(Model model) {
        List<String> files = s3Service.listFiles();
        model.addAttribute("files", files);
        return "fileList";
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable String fileName) throws IOException {
        S3Object s3Object = s3Service.downloadFile(fileName);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + fileName)
                .contentType(MediaType.parseMediaType(s3Object.getObjectMetadata().getContentType()))
                .contentLength(s3Object.getObjectMetadata().getContentLength())
                .body(new InputStreamResource(s3Object.getObjectContent()));
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<InputStreamResource> viewFile(@PathVariable String fileName) throws IOException {
        S3Object s3Object = s3Service.downloadFile(fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(s3Object.getObjectMetadata().getContentType()))
                .contentLength(s3Object.getObjectMetadata().getContentLength())
                .body(new InputStreamResource(s3Object.getObjectContent()));
    }
}

