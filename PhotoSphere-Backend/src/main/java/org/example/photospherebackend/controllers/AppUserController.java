package org.example.photospherebackend.controllers;

import org.example.photospherebackend.models.AppUser;
import org.example.photospherebackend.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class AppUserController {
    @Autowired
    private AppUserService appUserService;

    @GetMapping
    public List<AppUser> getAllAppUser() {
        return appUserService.getAllAppUser();
    }

    @GetMapping("/{id}")
    public Optional<AppUser> getAppUserById(@PathVariable Long id) {
        return appUserService.getAppUserById(id);
    }

    @GetMapping("/by-email/{email}")
    public Optional<AppUser> getAppUserByEmail(@PathVariable String email) {
        return appUserService.getAppUserByEmail(email);
    }

    @PostMapping
    public AppUser createAppUser(@RequestBody AppUser user) {
        return appUserService.createAppUser(user);
    }

    @PutMapping("/{id}")
    public AppUser updateAppUser(@PathVariable Long id, @RequestBody AppUser userDetails) {
        return appUserService.updateAppUser(id, userDetails);
    }

    @DeleteMapping
    public String deleteAllAppUser() {
        appUserService.deleteAllAppUser();
        return "All users have been deleted successfully.";
    }

    @DeleteMapping("/{id}")
    public void deleteAppUser(@PathVariable Long id) {
        appUserService.deleteAppUser(id);
    }
}
