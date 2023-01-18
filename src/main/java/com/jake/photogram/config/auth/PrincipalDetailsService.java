package com.jake.photogram.config.auth;

import com.jake.photogram.damain.User;
import com.jake.photogram.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PrincipalDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public PrincipalDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("로그인시도 - username = '{}'", username);
        User userEntity = userRepository.findByUsername(username);
        if (userEntity != null) {
            log.info("로그인 됨 - userEntity : '{}'", userEntity);
            return new PrincipalDetails(userEntity);
        }
        return null;
    }
}
