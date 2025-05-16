package com.example.safestock.dto;

import com.example.safestock.model.enums.CargoFuncionario;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class FuncionarioCadastro {

    @Size(min = 3, max = 15)
    @Schema(description = "Primeiro nome do usuário", example = "Rayane")
    private  String nome;

    @Size(min = 3, max = 20)
    @Schema(description = "Segundo nome do usuário", example = "Reis")
    private  String sobrenome;

    @Schema(description = "Sobrenome do usuário", example = "Dono")
    private CargoFuncionario cargo;

    @Email
    @Schema(description = "Email do usuário", example = "raygrs@gmail.com")
    private String email;

    @Schema(description = "Senha do usuário", example = "0424542@jj")
    private String senha;

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
