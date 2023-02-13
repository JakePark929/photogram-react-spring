package com.jake.photogram.controller.api;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.damain.Comment;
import com.jake.photogram.dto.CommonResponse;
import com.jake.photogram.dto.req.CommentRequest;
import com.jake.photogram.handler.exception.CustomValidationApiException;
import com.jake.photogram.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
public class CommentApiController {
    private final CommentService commentService;

    @PostMapping("/api/comment")
    public ResponseEntity<?> commentSave(
            @AuthenticationPrincipal PrincipalDetails principal,
            @Valid @RequestBody CommentRequest request,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("유효성 검사 실패함", errorMap);
        }
        Comment comment = commentService.writeComment(principal.getUser().getId(), request);
        return new ResponseEntity<>(new CommonResponse<>(1, "댓글쓰기 성공", comment), HttpStatus.CREATED);
    }

    @DeleteMapping("/api/comment/{id}")
    public ResponseEntity<?> commentDelete(@PathVariable Long id) {
        commentService.deleteComment(id);
        return new ResponseEntity<>(new CommonResponse<>(1, "댓글삭제 성공"), HttpStatus.OK);
    }
}
