package com.jake.photogram.repository;

import com.jake.photogram.damain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

//    @Modifying
//    @Query(value = "INSERT INTO comment(userId, content, imageId, createDate) VALUES (:userId, :content, :imageId, now())", nativeQuery = true)
//    int mSave(@Param("userId") Long userId, @Param("content") String content, @Param("imageId") Long imageId);
}
