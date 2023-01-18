package com.jake.photogram.damain;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@ToString
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
    @Setter private String website;
    @Setter private String bio;
    @Setter @Column(nullable = false) private String email;
    @Setter private String phone;
    @Setter private String gender;

    @Setter private String profileImageUrl;
    @Setter private String role;
    private LocalDateTime createDate;

    @PrePersist // DB Insert 직전에 실행
    public void createDate() {
        this.createDate = LocalDateTime.now();
    }
}
