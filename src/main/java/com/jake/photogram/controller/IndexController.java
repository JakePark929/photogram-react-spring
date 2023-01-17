package com.jake.photogram.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping("/auth/sign-in")
    public String signInPage() {return "/index.html";}
}
