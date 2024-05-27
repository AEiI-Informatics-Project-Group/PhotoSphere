package org.example.photospherebackend.repositories;


import org.example.photospherebackend.models.AuthUser;
import org.example.photospherebackend.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthUserRepository extends JpaRepository<AuthUser, Long> {
    public Optional<AuthUser> findByUser(AppUser user);
}