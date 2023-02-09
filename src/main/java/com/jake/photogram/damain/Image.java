package com.jake.photogram.damain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String caption;
    private String postImageUrl; // 사진을 전송받아서 그 사진을 서버의 특정 폴더에 저장 - DB에 그 저장된 경로를 insert

    @JsonIgnoreProperties({"images"})
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    // 이미지 좋아요
    @JsonIgnoreProperties({"image"})
    @OneToMany(mappedBy = "image")
    private List<Likes> likes;

    // TODO: 추후 추가할 내용
    // 댓글

    private LocalDateTime createDate;

    @Transient // DB에 컬럼이 만들어 지지 않는다.
    @Setter private boolean likeState;

    @Transient
    @Setter private int likeCount;

    public void setUser(User user) {
        this.user = user;
    }

    @PrePersist
    public void createDate() {
        this.createDate = LocalDateTime.now();
    }
}
