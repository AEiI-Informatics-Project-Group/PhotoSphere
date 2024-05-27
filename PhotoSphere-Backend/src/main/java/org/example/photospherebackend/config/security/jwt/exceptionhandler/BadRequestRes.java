package org.example.photospherebackend.config.security.jwt.exceptionhandler;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.example.photospherebackend.enums.BadRequestDictEnum;

@Getter
@Setter
public class BadRequestRes {

    @JsonProperty("code")
    private final String code;
    @JsonProperty("description")
    private final String description;
    @JsonProperty("value")
    private final String value;

    public BadRequestRes(BadRequestDictEnum badRequestDict, String value) {
        this.code = badRequestDict.name();
        this.description = badRequestDict.getDescription();
        this.value = value;
    }
}
