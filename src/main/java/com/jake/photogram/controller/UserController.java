package com.jake.photogram.controller;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.damain.User;
import com.jake.photogram.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class UserController {
    private final UserService userService;
    @GetMapping("/user/log-info")
    public ResponseEntity<?> myInfo(@AuthenticationPrincipal PrincipalDetails principal) {
        User user = principal.getUser();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
