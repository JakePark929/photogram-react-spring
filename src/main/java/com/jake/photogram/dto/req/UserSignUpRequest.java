package com.jake.photogram.dto.req;

import com.jake.photogram.damain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserSignUpRequest {
    @NotNull(message = "아이디 키 값이 없습니다.")
    @NotBlank(message = "아이디를 입력하세요.")
    @Size(max=20, message = "아이디가 길이를 초과하였습니다.")
    String username;
    @NotBlank(message = "비밀번호를 입력하세요.")
    String password;
    @NotBlank(message = "이메일을 입력하세요.")
    String email;
    @NotBlank(message = "이름을 입력하세요.")
    String name;

    public User toEntity() {
        return User.builder()
                .username(username)
                .password(password)
                .email(email)
                .name(name)
                .build();
    }
}
