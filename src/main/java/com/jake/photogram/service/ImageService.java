package com.jake.photogram.service;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.damain.Image;
import com.jake.photogram.dto.req.ImageUploadRequest;
import com.jake.photogram.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ImageService {
    @Value("${file.path}")
    private String uploadFolder;

    private final ImageRepository imageRepository;

    @Transactional
    public Integer uploadImage(ImageUploadRequest request, PrincipalDetails principal) {
        LocalDateTime now = LocalDateTime.now();
        String date = "" + now.getYear() + addZeroToNumber(now.getMonthValue()) + addZeroToNumber(now.getDayOfMonth());
        UUID uuid = UUID.randomUUID();
        String filename = request.getFile().getOriginalFilename();
        assert filename != null;
        String extension = filename.substring(filename.lastIndexOf("."));
        String imageFileName = date + "_" + uuid + extension;
        Path imageFilePath = Paths.get(uploadFolder + imageFileName);

        log.info("Caption: {}", request.getCaption());
        log.info("imageFileName: {}", imageFileName);
        try {
            Files.createDirectories(Paths.get(uploadFolder));
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            // 통신, I/O(HDD read or write) -> 예외가 발생할 수 있다.
            Files.write(imageFilePath, request.getFile().getBytes());
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }

        Image image = request.toEntity(imageFileName, principal.getUser());
        Image imageEntity = imageRepository.save(image);

//        log.info(imageEntity.toString());

        return 1;
    }

    @Transactional(readOnly = true) // 영속성 컨텍스트 변경 감지를 해서, 더티체킹, flush(반영)
    public Page<Image> imageStory(Long principalId, Pageable pageable) {
        Page<Image> images = imageRepository.mStory(principalId, pageable);

        // 3(asd) 로그인
        // images 에 좋아요 상태 담기
        images.forEach((image)->{
            image.setLikeCount(image.getLikes().size());

            image.getLikes().forEach((like) -> {
                // 해당 이미지에 좋아요한 사람들을 찾아서 현재 로긴한 사람이 좋아요 한것인지 비교
                if(Objects.equals(like.getUser().getId(), principalId)) {
                    image.setLikeState(true);
                }
            });
        });
        return images;
    }

    @Transactional(readOnly = true) // 영속성 컨텍스트 변경 감지를 해서, 더티체킹, flush(반영)
    public Page<Image> imageMyStory(Long principalId, Pageable pageable) {
        Page<Image> images = imageRepository.findByUserId(principalId, pageable);

        // 3(asd) 로그인
        // images 에 좋아요 상태 담기
        images.forEach((image)->{
            image.setLikeCount(image.getLikes().size());

            image.getLikes().forEach((like) -> {
                // 해당 이미지에 좋아요한 사람들을 찾아서 현재 로긴한 사람이 좋아요 한것인지 비교
                if(Objects.equals(like.getUser().getId(), principalId)) {
                    image.setLikeState(true);
                }
            });
        });
        return images;
    }

    @Transactional(readOnly = true)
    public List<Image> poplarImage() {
        return imageRepository.mPopular();
    }

    protected String addZeroToNumber(int number) {
        if (number < 10) {
            return "0" + number;
        }
        return "" + number;
    }
}
