package com.jake.photogram.service;

import com.jake.photogram.damain.User;
import com.jake.photogram.dto.req.UserUpdateRequest;
import com.jake.photogram.dto.res.UserProfileResponse;
import com.jake.photogram.handler.exception.CustomApiException;
import com.jake.photogram.handler.exception.CustomValidationApiException;
import com.jake.photogram.repository.SubscribeRepository;
import com.jake.photogram.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final SubscribeRepository subscribeRepository;
    private final BCryptPasswordEncoder encoder;

    @Value("${file.path}")
    private String uploadFolder;

    @Transactional(readOnly = true)
    public UserProfileResponse userProfile(Long pageUserId, Long principalId) {
        // SELECT * FROM image WHERE userId = :userId;
        User userEntity = userRepository.findById(pageUserId)
                .orElseThrow(() -> new CustomApiException("해당 프로필 페이지는 없는 페이지 입니다."));

        UserProfileResponse response = new UserProfileResponse();
        response.setUser(userEntity);
        response.setPageOwnerState(pageUserId.equals(principalId));
        response.setImageCount(userEntity.getImages().size());

        int subscribeState = subscribeRepository.mSubScribeState(pageUserId, principalId);
        int subscribeCount = subscribeRepository.mSubscribeCount(pageUserId);
        response.setSubscribeState(subscribeState == 1);
        response.setSubscribeCount(subscribeCount);

        userEntity.getImages().forEach((image -> {
            image.setLikeCount(image.getLikes().size());
        }));

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

    @Transactional
    public User changeProfileImage(Long principalId, MultipartFile profileImageFile) {
        LocalDateTime now = LocalDateTime.now();
        String date = "" + now.getYear() + addZeroToNumber(now.getMonthValue()) + addZeroToNumber(now.getDayOfMonth());
        UUID uuid = UUID.randomUUID();
        String filename = profileImageFile.getOriginalFilename();
        assert filename != null;
        String extension = filename.substring(filename.lastIndexOf("."));
        String imageFileName = date + "_profile_" + uuid + extension;
        Path imageFilePath = Paths.get(uploadFolder + "\\profile\\" + imageFileName);

        try {
            Files.createDirectories(Paths.get(uploadFolder + "\\profile\\"));
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            // 통신, I/O(HDD read or write) -> 예외가 발생할 수 있다.
            Files.write(imageFilePath, profileImageFile.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }

        User userEntity = userRepository.findById(principalId).orElseThrow(() -> {
            throw new CustomValidationApiException("유저를 찾을 수 없습니다.");
        });
        userEntity.setProfileImageUrl(imageFileName);
        return userEntity;
    }

    protected String addZeroToNumber(int number) {
        if (number < 10) {
            return "0" + number;
        }
        return "" + number;
    }
}
