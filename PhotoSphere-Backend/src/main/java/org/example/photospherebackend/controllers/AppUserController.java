package org.example.photospherebackend.controllers;

import org.example.photospherebackend.models.AppUser;
import org.example.photospherebackend.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class AppUserController {

    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping
    public List<AppUser> getAllUsers() {
        return appUserService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable Long id) {
        Optional<AppUser> user = appUserService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public AppUser createUser(@RequestBody AppUser user) {
        return appUserService.createUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppUser> updateUser(@PathVariable Long id, @RequestBody AppUser user) {
        if (!appUserService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        user.setId(id);
        return ResponseEntity.ok(appUserService.updateUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!appUserService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        appUserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<Void> uploadUserImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) throws IOException {
        Optional<AppUser> user = appUserService.getUserById(id);
        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        File imageFile = new File(System.getProperty("java.io.tmpdir") + "/" + image.getOriginalFilename());
        image.transferTo(imageFile);
        appUserService.uploadUserImage(id.toString(), imageFile);
        return ResponseEntity.ok().build();
    }
}