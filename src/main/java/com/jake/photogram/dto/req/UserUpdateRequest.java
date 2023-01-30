package com.jake.photogram.dto.req;

import com.jake.photogram.damain.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserUpdateRequest {
    @NotBlank(message = "공백일 수 없습니다.")
    private String name;
    @NotBlank(message = "공백일 수 없습니다.")
    private String password;
    private String website;
    private String bio;
    private String phone;
    private String gender;

    // TODO: 조금 위험함, 코드 수정이 필요할 예정
    public User toEntity() {
        return User.builder()
                .name(name)
                .password(password)
                .website(website)
                .bio(bio)
                .phone(phone)
                .gender(gender)
                .build();
    }
}
