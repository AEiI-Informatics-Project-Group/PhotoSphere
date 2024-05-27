package org.example.photospherebackend.models;

import jakarta.persistence.*;
import lombok.*;
import org.example.photospherebackend.enums.Roles;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@Table(name = "app_user")
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @NonNull
    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Roles role;

    @NonNull
    @Column(name = "approved", nullable = false)
    private Boolean approved;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private AuthUser authUser;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RefreshToken> refreshTokenList;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "day_of_birth", nullable = false)
    private LocalDate dayOfBirth;

    public AppUser(@NonNull String email, @NonNull Roles role) {
        this.email = email;
        this.role = role;
        this.approved = true;
    }
}