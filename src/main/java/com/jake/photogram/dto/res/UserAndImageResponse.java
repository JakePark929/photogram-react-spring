package com.jake.photogram.dto.res;

import com.jake.photogram.damain.Image;
import com.jake.photogram.damain.User;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserAndImageResponse {
    private Long id;
    private String username;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private String website;
    private String bio;
    private String profileImageUrl;
    private List<ImageResponse> images;

    public static UserAndImageResponse fromEntity(User user) {
        return UserAndImageResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }
}
