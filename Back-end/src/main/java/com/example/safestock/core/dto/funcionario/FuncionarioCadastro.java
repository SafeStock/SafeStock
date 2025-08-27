package com.example.safestock.core.dto.funcionario;

import com.example.safestock.core.domain.enuns.CargoFuncionario;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class FuncionarioCadastro {

    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 3, max = 15, message = "O nome deve ter entre 3 e 15 caracteres")
    @Schema(description = "Primeiro nome do usuário", example = "Rayane")
    private String nome;

    @NotBlank(message = "O sobrenome é obrigatório")
    @Size(min = 3, max = 20, message = "O sobrenome deve ter entre 3 e 20 caracteres")
    @Schema(description = "Segundo nome do usuário", example = "Reis")
    private String sobrenome;

    @Schema(description = "Cargo do usuário", example = "Dono")
    private CargoFuncionario cargo;

    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "E-mail inválido")
    @Schema(description = "Email do usuário", example = "raygrs@gmail.com")
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 4, message = "A senha deve conter no mínimo 4 caracteres")
    @Pattern(
            regexp = ".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*",
            message = "A senha deve conter pelo menos um caractere especial"
    )
    @Schema(description = "Senha do usuário", example = "0424542@jj")
    private String senha;

    @NotBlank(message = "O telefone é obrigatório")
    @Pattern(regexp = "\\d{11}", message = "O telefone deve conter 11 dígitos (DDD + número)")
    @Schema(description = "Telefone do usuário", example = "11987652341")
    private String telefone;


    // getters e setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public CargoFuncionario getCargo() {
        return cargo;
    }

    public void setCargo(CargoFuncionario cargo) {
        this.cargo = cargo;
    }

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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

}
