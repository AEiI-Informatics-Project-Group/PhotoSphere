package org.example.photospherebackend.auth;

import lombok.RequiredArgsConstructor;
import org.example.photospherebackend.models.AppUser;
import org.example.photospherebackend.repositories.AppUserRepository;
import org.example.photospherebackend.repositories.RoleRepository;
import org.example.photospherebackend.repositories.TokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.PasswordAuthentication;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppUserRepository appUserRepository;
    private final TokenRepository tokenRepository;

    public void register(RegistrationRequest request) {
        var userRole = roleRepository.findByName("USER")
                //todo
                .orElseThrow(() -> new IllegalStateException("ROLE USER was not initialized"));
        var user = AppUser.builder()
                .username(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .gender(request.getGender())
                .dayOfBirth(request.getDayOfBirth())
                .accountLocked(false)
                .enabled(true)
                .roles(List.of(userRole))
                .build();
        appUserRepository.save(user);
    }
}
