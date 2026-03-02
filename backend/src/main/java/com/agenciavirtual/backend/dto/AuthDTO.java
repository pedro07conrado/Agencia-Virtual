package com.agenciavirtual.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthDTO {

    @NotBlank
    private String identificador;

    @NotBlank
    private String senha;
}