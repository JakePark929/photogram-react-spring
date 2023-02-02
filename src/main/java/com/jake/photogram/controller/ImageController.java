package com.jake.photogram.controller;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.dto.req.ImageUploadRequest;
import com.jake.photogram.handler.exception.CustomValidationException;
import com.jake.photogram.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ImageController {
    private final ImageService imageService;

    @PostMapping("/image")
    public ResponseEntity<?> imageUpload(
            @RequestPart(value = "caption") String caption,
            @RequestPart(value = "file") MultipartFile file,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        if(file.isEmpty()) {
            throw new CustomValidationException("이미지가 첨부되지 않았습니다.", null);
        }
        ImageUploadRequest request = new ImageUploadRequest();
        request.setCaption(caption);
        request.setFile(file);
        Integer result = imageService.uploadImage(request, principal);
        if (result > 0) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
