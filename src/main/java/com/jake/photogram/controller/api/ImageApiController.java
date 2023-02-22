package com.jake.photogram.controller.api;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.damain.Image;
import com.jake.photogram.dto.CommonResponse;
import com.jake.photogram.service.ImageService;
import com.jake.photogram.service.LikesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ImageApiController {
    private final ImageService imageService;
    private final LikesService likesService;

    @GetMapping("/api/image")
    public ResponseEntity<?> imageStory(
            @AuthenticationPrincipal PrincipalDetails principal,
            @PageableDefault(size = 3) Pageable pageable
    ) {
        Page<Image> images = imageService.imageStory(principal.getUser().getId(), pageable);
        return new ResponseEntity<>(new CommonResponse<>(1, "스토리 불러오기 성공", images), HttpStatus.OK);
    }

    @DeleteMapping("/api/image/{id}")
    public ResponseEntity<?> imageDelete(
            @PathVariable Long id
    ) {
        imageService.deleteImage(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/image/popular")
    public ResponseEntity<?> imagePopular(
    ) {
        List<Image> images = imageService.poplarImage();
        return new ResponseEntity<>(new CommonResponse<>(1, "인기사진 불러오기 성공", images), HttpStatus.OK);
    }

    @PostMapping("/api/image/{imageId}/likes")
    public ResponseEntity<?> likes(
            @PathVariable Long imageId,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        likesService.likes(imageId, principal.getUser().getId());
        return new ResponseEntity<>(new CommonResponse<>(1, "좋아요 성공", null), HttpStatus.CREATED);
    }

    @DeleteMapping("/api/image/{imageId}/likes")
    public ResponseEntity<?> unLikes(
            @PathVariable Long imageId,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        likesService.unLikes(imageId, principal.getUser().getId());
        return new ResponseEntity<>(new CommonResponse<>(1, "좋아요 취소 성공", null), HttpStatus.OK);
    }
}
