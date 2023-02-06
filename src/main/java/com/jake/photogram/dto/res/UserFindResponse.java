package com.jake.photogram.dto.res;

import com.jake.photogram.damain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserFindResponse {
    private Long id;
    private String username;
    private String name;
    private String website;
    private String bio;
    private String email;
    private String phone;
    private String gender;

    public UserFindResponse (User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.name = user.getName();
        this.website = user.getWebsite();
        this.bio = user.getBio();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.gender = user.getGender();
    }
}
