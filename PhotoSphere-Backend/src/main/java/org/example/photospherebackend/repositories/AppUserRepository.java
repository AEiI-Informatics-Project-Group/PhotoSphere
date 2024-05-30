package org.example.photospherebackend.repositories;

import org.example.photospherebackend.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    // You can define custom query methods here if needed
}
