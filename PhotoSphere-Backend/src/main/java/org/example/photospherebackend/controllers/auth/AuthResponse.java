package org.example.photospherebackend.controllers.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.photospherebackend.enums.JwtTokenTypeEnum;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("access_token_expiry")
    private int accessTokenExpiry;
    @JsonProperty("token_type")
    private JwtTokenTypeEnum tokenType;
    @JsonProperty("user_name")
    private String userName;
}