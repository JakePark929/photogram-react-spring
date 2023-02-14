package com.jake.photogram.controller;

import com.jake.photogram.damain.User;
import com.jake.photogram.dto.req.UserSignUpRequest;
import com.jake.photogram.service.AuthService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // 회원가입
    @CrossOrigin
    @PostMapping("/auth/sign-up")
    public ResponseEntity<?> signup(@Valid @RequestBody UserSignUpRequest userSignUpRequest, BindingResult bindingResult) {
        User user = userSignUpRequest.toEntity();
        authService.signUp(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
