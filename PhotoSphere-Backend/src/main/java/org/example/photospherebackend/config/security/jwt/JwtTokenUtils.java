package org.example.photospherebackend.config.security.jwt;


import lombok.RequiredArgsConstructor;
import org.example.photospherebackend.config.user.CustomUserDetails;
import org.example.photospherebackend.repositories.AppUserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtTokenUtils {

    private final AppUserRepository userRepository;

    public String getUsername(Jwt token) {
        return token.getSubject();
    }

    public boolean isTokenValid(Jwt token, CustomUserDetails userDetails){
        final String userName = getUsername(token);
        boolean isTokenExpired = getIfTokenIsExpired(token);
        boolean isTokenUserSameAsDatabase = userName.equals(userDetails.getUsername());
        return !isTokenExpired  && isTokenUserSameAsDatabase;

    }

    private boolean getIfTokenIsExpired(Jwt token) {
        return Objects.requireNonNull(token.getExpiresAt()).isBefore(Instant.now());
    }

    public CustomUserDetails getUserDetails(String email) {
        return userRepository.findByEmail(email)
                .map(CustomUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("UserEmail: "+email+" does not exist"));
    }


}
