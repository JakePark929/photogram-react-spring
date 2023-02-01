package com.jake.photogram.damain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name="subscribe_uk",
                        columnNames = {"fromUserId", "toUserId"} // 실제 컬럼명
                )
        }
)
@Entity
public class Subscribe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "fromUserId") private User fromUser;
    @ManyToOne @JoinColumn(name = "toUserId") private User toUser;

    private LocalDateTime createDate;

    @PrePersist // DB Insert 직전에 실행
    public void createDate() {
        this.createDate = LocalDateTime.now();
    }
}
