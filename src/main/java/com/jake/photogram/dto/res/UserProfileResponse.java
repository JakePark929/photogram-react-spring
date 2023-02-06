package com.jake.photogram.dto.res;

import com.jake.photogram.damain.User;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserProfileResponse {
    private boolean pageOwner;
    private int imageCount;
    private User user;
}
