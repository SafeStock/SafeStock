package com.example.safestock.dto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Getter @Setter
public class FuncionarioLogin {

    @Schema(description = "E-mail do usuário", example = "joh@doe.com")
    @Email
    private String email;

    @Schema(description = "Senha do usuário", example = "johDoe123")
    @NotBlank(message = "O campo senha não pode ser nulo")
    @Size(min = 4, message = "O campo senha deve conter no minimo 4 caracteres")
    private String senha;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}
