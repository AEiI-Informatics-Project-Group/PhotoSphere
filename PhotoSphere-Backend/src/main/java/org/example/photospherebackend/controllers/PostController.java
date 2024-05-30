package org.example.photospherebackend.controllers;

import org.example.photospherebackend.models.Post;
import org.example.photospherebackend.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Optional<Post> post = postService.getPostById(id);
        if (post.isPresent()) {
            return ResponseEntity.ok(post.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Optional<Post> optionalPost = postService.getPostById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setCaption(postDetails.getCaption());
            post.setImageUrl(postDetails.getImageUrl());
            post.setCategory(postDetails.getCategory());
            return ResponseEntity.ok(postService.updatePost(post));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        if (postService.getPostById(id).isPresent()) {
            postService.deletePostById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
