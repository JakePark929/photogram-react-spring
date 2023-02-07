package com.jake.photogram.dto.res;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SubscribeListResponse {
    private Long id;
    private String username;
    private String profileImageUrl;
    private Integer subscribeState;
    private Integer equalUserState;
}
