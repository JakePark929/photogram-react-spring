package com.jake.photogram.service;

import com.jake.photogram.config.auth.PrincipalDetails;
import com.jake.photogram.damain.Image;
import com.jake.photogram.dto.req.ImageUploadRequest;
import com.jake.photogram.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ImageService {
    @Value("${file.path}")
    private String uploadFolder;

    private final ImageRepository imageRepository;

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
            // 통신, I/O(HDD read or write) -> 예외가 발생할 수 있다.
            Files.write(imageFilePath, request.getFile().getBytes());
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }

        Image image = request.toEntity(imageFileName, principal.getUser());
        Image imageEntity = imageRepository.save(image);

        log.info(imageEntity.toString());

        return 1;
    }

    protected String addZeroToNumber(int number) {
        if (number < 10) {
            return "0" + number;
        }
        return "" + number;
    }
}
