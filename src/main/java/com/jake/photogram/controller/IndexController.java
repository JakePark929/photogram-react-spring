package com.jake.photogram.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class IndexController {
    @GetMapping("/auth/sign-in")
    public String signInPage() {return "/index.html";}

    @GetMapping({"/", "/image/story"})
    public String storyPage() {
        return "/index.html";
    }

    @GetMapping("/image/:id")
    public String myStoryPage() {
        return "/index.html";
    }

    @GetMapping("/image/popular")
    public String PopularPage() { return "/index.html"; }

    @GetMapping("/user/{id}")
    public String ProfilePage(@PathVariable String id) { return "/index.html"; }
}
