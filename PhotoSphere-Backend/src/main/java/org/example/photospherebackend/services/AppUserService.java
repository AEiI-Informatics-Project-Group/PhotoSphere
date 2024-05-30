package org.example.photospherebackend.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.example.photospherebackend.models.AppUser;
import org.example.photospherebackend.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final AmazonS3 amazonS3;
    private final String bucketName = "photosphere-bucket";

    @Autowired
    public AppUserService(AppUserRepository appUserRepository, AmazonS3 amazonS3) {
        this.appUserRepository = appUserRepository;
        this.amazonS3 = amazonS3;
    }

    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    public Optional<AppUser> getUserById(Long id) {
        return appUserRepository.findById(id);
    }

    public AppUser createUser(AppUser user) {
        return appUserRepository.save(user);
    }

    public AppUser updateUser(AppUser user) {
        return appUserRepository.save(user);
    }

    public void deleteUser(Long id) {
        appUserRepository.deleteById(id);
    }

    public void uploadUserImage(String userId, File imageFile) {
        String key = "users/" + userId + "/" + imageFile.getName();
        amazonS3.putObject(new PutObjectRequest(bucketName, key, imageFile));
    }
}
