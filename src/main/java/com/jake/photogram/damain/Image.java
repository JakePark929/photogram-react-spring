package com.jake.photogram.damain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String caption;
    private String postImageUrl; // 사진을 전송받아서 그 사진을 서버의 특정 폴더에 저장 - DB에 그 저장된 경로를 insert

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    // TODO: 추후 추가할 내용
    // 이미지 좋아요
    // 댓글

    private LocalDateTime createDate;

    public void setUser(User user) {
        this.user = user;
    }

    @PrePersist
    public void createDate() {
        this.createDate = LocalDateTime.now();
    }
}
