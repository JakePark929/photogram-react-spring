package com.jake.photogram.dto.res;

import com.jake.photogram.damain.Image;
import lombok.Builder;
import lombok.Data;
import lombok.Value;

import java.time.LocalDateTime;

@Builder
@Data
public class ImageResponse {
    private Long id;
    private String caption;
    private String postImageUrl;
    private LocalDateTime createDate;

    public static ImageResponse fromEntity(Image image) {
        return ImageResponse.builder()
                .id(image.getId())
                .caption(image.getCaption())
                .postImageUrl(image.getPostImageUrl())
                .createDate(image.getCreateDate())
                .build();
    }
}
