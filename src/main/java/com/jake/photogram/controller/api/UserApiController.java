package com.jake.photogram.controller.api;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.damain.User;
import com.jake.photogram.dto.CommonResponse;
import com.jake.photogram.dto.req.UserUpdateRequest;
import com.jake.photogram.dto.res.SubscribeListResponse;
import com.jake.photogram.dto.res.UserProfileResponse;
import com.jake.photogram.handler.exception.CustomValidationApiException;
import com.jake.photogram.service.SubscribeService;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
public class UserApiController {
    private final UserService userService;
    private final SubscribeService subscribeService;

    @GetMapping("/api/user/{pageUserId}")
    public ResponseEntity<CommonResponse<?>> userProfile(
            @PathVariable Long pageUserId,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        UserProfileResponse response = userService.userProfile(pageUserId, principal.getUser().getId());
        return new ResponseEntity<>(new CommonResponse<>(1, "유저정보 불러오기 성공", response), HttpStatus.OK);
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

    @PutMapping("/api/user/{principalId}/profileImageUrl")
    public ResponseEntity<?> profileImageUrlUpdate(
            @PathVariable Long principalId,
            @RequestPart(value = "profileImageFile") MultipartFile profileImageFile,
            @AuthenticationPrincipal PrincipalDetails principal
            ) {
        User userEntity = userService.changeProfileImage(principalId, profileImageFile);
        principal.setUser(userEntity);
        return new ResponseEntity<>(new CommonResponse<>(1, "프로필사진 변경 성공", null), HttpStatus.OK);
    }

    @GetMapping("/api/user/{pageUserId}/subscribe")
    public ResponseEntity<?> subscribeList(@PathVariable Long pageUserId, @AuthenticationPrincipal PrincipalDetails principal) {
        List<SubscribeListResponse> response = subscribeService.subscribeList(pageUserId, principal.getUser().getId());
        return new ResponseEntity<>(new CommonResponse<>(1, "구독정보 불러오기 성공", response), HttpStatus.OK);
    }
}
