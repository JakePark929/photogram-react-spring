package com.jake.photogram.service;

import com.jake.photogram.damain.User;
import com.jake.photogram.dto.req.UserUpdateRequest;
import com.jake.photogram.dto.res.UserProfileResponse;
import com.jake.photogram.handler.exception.CustomApiException;
import com.jake.photogram.handler.exception.CustomValidationApiException;
import com.jake.photogram.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Transactional(readOnly = true)
    public UserProfileResponse userProfile(Long pageUserId, Long principalId) {
        // SELECT * FROM image WHERE userId = :userId;
        User userEntity = userRepository.findById(pageUserId)
                .orElseThrow(() -> new CustomApiException("해당 프로필 페이지는 없는 페이지 입니다."));

        UserProfileResponse response = new UserProfileResponse();
        response.setUser(userEntity);
        response.setPageOwner(pageUserId.equals(principalId));
        response.setImageCount(userEntity.getImages().size());

        return response;
    }

    @Transactional
    public User updateUser(Long id, UserUpdateRequest request) {
        // 1. 영속화
        User userEntity = userRepository.findById(id)
                .orElseThrow(() -> new CustomValidationApiException("찾을 수 없는 id 입니다.")); // 1. 무조건 찾았다 걱정마 get 2. 못찾았어 익셉션 처리할게 orElseThrow() 3. orElse

        // 2. User 정보 (영속성 컨텍스트)
        assert request.getName().isBlank();
        userEntity.setName(request.getName());
        assert request.getPassword().isBlank();
        String rawPassword = request.getPassword();
        String encPassword = encoder.encode(rawPassword);
        userEntity.setPassword(encPassword);
        assert request.getBio().isBlank();
        userEntity.setBio(request.getBio());
        assert request.getWebsite().isBlank();
        userEntity.setWebsite(request.getWebsite());
        assert request.getPhone().isBlank();
        userEntity.setPhone(request.getPhone());
        assert request.getGender().isBlank();
        userEntity.setGender(request.getGender());
        return userEntity;
    } // 더티체킹이 일어나서 업데이트가 완료됨.
}
