package org.example.photospherebackend.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@Table(name = "auth_user")
@NoArgsConstructor
@AllArgsConstructor
public class AuthUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user", referencedColumnName = "id", nullable = false)
    private AppUser user;

    @NonNull
    @Column(name = "password", nullable = false)
    private String password;

    public AuthUser(@NonNull AppUser user, @NonNull String password) {
        this.user = user;
        this.password = password;
    }
}
