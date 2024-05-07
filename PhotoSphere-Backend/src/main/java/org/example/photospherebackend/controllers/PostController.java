package org.example.photospherebackend.controllers;

import org.example.photospherebackend.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/posts") idk
public class PostController {
    @Autowired
    private PostService postService;
}
