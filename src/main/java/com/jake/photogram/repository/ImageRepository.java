package com.jake.photogram.repository;

import com.jake.photogram.damain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
