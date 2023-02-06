package com.jake.photogram.controller;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.dto.res.UserFindResponse;
import com.jake.photogram.dto.res.UserLogResponse;
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
    public ResponseEntity<?> logInfo(@AuthenticationPrincipal PrincipalDetails principal) {
        UserLogResponse response = new UserLogResponse();
        response.setId(principal.getUser().getId());
        response.setUsername(principal.getUser().getUsername());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/my-info")
    public ResponseEntity<?> myInfo(@AuthenticationPrincipal PrincipalDetails principal) {
        UserFindResponse response = new UserFindResponse(principal.getUser());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
