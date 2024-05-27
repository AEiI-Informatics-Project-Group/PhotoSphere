package org.example.photospherebackend.services;

import lombok.RequiredArgsConstructor;
import org.example.photospherebackend.config.user.CustomUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AppUserService appUserService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new CustomUserDetails(appUserService.getAppUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found")));
    }
}