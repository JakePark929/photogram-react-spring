package com.jake.photogram.damain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter @Column(length = 100, nullable = false) private String content;

    @Setter
    @JsonIgnoreProperties({"images"})
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.EAGER) // Eager default, OneToMany Lazy default
    private User user;

    @Setter
    @JoinColumn(name = "imageId")
    @ManyToOne(fetch = FetchType.EAGER)
    private Image image;

    private LocalDateTime createDate;

    @PrePersist
    public void createDate() {
        this.createDate = LocalDateTime.now();
    }
}
