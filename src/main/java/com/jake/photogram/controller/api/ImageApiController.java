package com.jake.photogram.controller.api;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.damain.Image;
import com.jake.photogram.dto.CommonResponse;
import com.jake.photogram.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ImageApiController {
    private final ImageService imageService;

    @GetMapping("/api/image")
    public ResponseEntity<?> imageStory(
            @AuthenticationPrincipal PrincipalDetails principal,
            @PageableDefault(size = 3) Pageable pageable
    ) {
        Page<Image> images = imageService.imageStory(principal.getUser().getId(), pageable);
        return new ResponseEntity<>(new CommonResponse<>(1, "스토리 불러오기 성공", images), HttpStatus.OK);
    }
}
