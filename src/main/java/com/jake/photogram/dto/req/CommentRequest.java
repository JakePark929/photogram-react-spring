package com.jake.photogram.dto.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

// NotNull = Null 체크
// NotEmpty = 빈 값, null 체크
// NotBlank = 빈값, 공백, null 체크

@Getter
@Setter
public class CommentRequest {
    @NotNull
    private Long imageId;
    @NotBlank
    private String content;
    // toEntity 가 필요없다
}
