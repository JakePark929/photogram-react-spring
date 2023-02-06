package com.jake.photogram.controller.api;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.damain.User;
import com.jake.photogram.dto.CommonResponse;
import com.jake.photogram.dto.req.UserUpdateRequest;
import com.jake.photogram.handler.exception.CustomValidationApiException;
import com.jake.photogram.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
public class UserApiController {
    private final UserService userService;

    @GetMapping("/api/user/{id}")
    public ResponseEntity<CommonResponse<?>> userProfile(@PathVariable Long id) {
        User userEntity = userService.userProfile(id);
        return new ResponseEntity<>(new CommonResponse<>(1, "유저정보 불러오기 성공", userEntity), HttpStatus.OK);
    }

    @PutMapping("/api/user/{id}/update")
    public ResponseEntity<CommonResponse<?>> updateUser(
            @PathVariable Long id,
            @AuthenticationPrincipal PrincipalDetails principal,
            @Valid @RequestBody UserUpdateRequest request,
            BindingResult bindingResult // @Valid 가 적혀있는 다음 파라메터에 적어야 됨?
    ) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("유효성 검사 실패함", errorMap);
        } else {
            User userEntity = userService.updateUser(id, request);
            principal.setUser(userEntity); // 세션 정보 변경
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
