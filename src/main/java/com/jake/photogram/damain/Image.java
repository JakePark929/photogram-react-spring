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
    @Setter
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

    // 댓글
    @JsonIgnoreProperties({"image"})
    @OneToMany(mappedBy = "image") // lazy loading
    private List<Comment> comments;

    @Transient // DB에 컬럼이 만들어 지지 않는다.
    @Setter private boolean likeState;

    @Transient
    @Setter private int likeCount;

    private LocalDateTime createDate;
    
    @PrePersist
    public void createDate() {
        this.createDate = LocalDateTime.now();
    }

    public void setUser(User user) {
        this.user = user;
    }
}
