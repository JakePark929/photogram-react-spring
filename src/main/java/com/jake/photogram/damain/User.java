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
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter @Column(unique = true, nullable = false, length = 20) private String username;
    @Setter @Column(nullable = false) private String password;

    @Setter @Column(nullable = false) private String name;
    @Setter @Column(nullable = false) private String email;
    @Setter private String phone;
    @Setter private String gender;
    @Setter private String website;
    @Setter private String bio;
    @Setter private String profileImageUrl;
    @Setter private String privateFileUrl;

    @Setter private String role;

    // 나는 연관관계의 주인이 아니다. 그러므로 테이블에 컬럼을 만들지 마.
    // User 를 Select 할 때 해당 User id로 등록된 image 들을 다 가져와.
    // Lazy = User 를 Select 할 때 해당 User id로 등록된 image 들을 가져오지마. - 대신 getImages() 함수가 호출될 때 가져와.
    // Eager = User 를 Select 할 때 User id로 등록된 image 들을 전부 Join 해서 가져와
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"user"})
    private List<Image> images;

    private LocalDateTime createDate;

    @PrePersist // DB Insert 직전에 실행
    public void createDate() {
        this.createDate = LocalDateTime.now();
    }
}
