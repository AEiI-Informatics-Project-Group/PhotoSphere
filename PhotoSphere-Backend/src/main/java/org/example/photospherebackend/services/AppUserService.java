package org.example.photospherebackend.services;

import org.example.photospherebackend.models.AppUser;
import org.example.photospherebackend.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@Service
public class AppUserService {
    @Autowired
    private AppUserRepository appUserRepository;

    public List<AppUser> getAllAppUser() {
        return appUserRepository.findAll();
    }

    public Optional<AppUser> getAppUserById(Long id) {
        return appUserRepository.findById(id);
    }

    public Optional<AppUser> getAppUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    public AppUser createAppUser(AppUser user) {
        return appUserRepository.save(user);
    }

    public AppUser updateAppUser(Long id, AppUser userDetails) {
        Optional<AppUser> appUserOptional = appUserRepository.findById(id);

        if (appUserOptional.isPresent()) {
            AppUser existingAppUser = appUserOptional.get();
            existingAppUser.setUsername(userDetails.getUsername());
            existingAppUser.setFirstName(userDetails.getFirstName());
            existingAppUser.setLastName(userDetails.getLastName());
            existingAppUser.setEmail(userDetails.getEmail());
            existingAppUser.setGender(userDetails.getGender());
            existingAppUser.setDayOfBirth(userDetails.getDayOfBirth());
            return appUserRepository.save(existingAppUser);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with ID " + id + " not found");
            // You can use other HTTP status codes as needed, like HttpStatus.BAD_REQUEST
        }
    }

    public void deleteAllAppUser() {
        appUserRepository.deleteAll();
    }

    public void deleteAppUser(Long id) {
        appUserRepository.deleteById(id);
    }
}
