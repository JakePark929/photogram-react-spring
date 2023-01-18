package com.jake.photogram.service;

import com.jake.photogram.constant.RoleType;
import com.jake.photogram.damain.User;
import com.jake.photogram.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    // 회원가입
    @Transactional
    public Integer signUp(User user) {
        try {
            String rawPassword = user.getPassword();
            String encPassword = encoder.encode(rawPassword);
            user.setPassword(encPassword);
            user.setRole(RoleType.USER.getDescription());
            User userEntity = userRepository.save(user);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            log.warn("AuthService.signup(): " + e.getMessage());
        }
        return -1;
    }
}
