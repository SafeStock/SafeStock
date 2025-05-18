package com.example.safestock.dto;

import com.example.safestock.model.enums.CargoFuncionario;
import io.swagger.v3.oas.annotations.media.Schema;

public class FuncionarioListar {
    @Schema(description = "Id do usuário", example = "1")
    private Long id;

    @Schema(description = "Nome do usuário", example = "John Doe")
    private String nome;

    @Schema(description = "Sobrenome do usuário", example = "John Doe")
    private String sobrenome;

    @Schema(description = "Cargo do usuário", example = "Dono")
    private CargoFuncionario cargo;

    @Schema(description = "Email do usuário", example = "John@doe.com")
    private String email;

    @Schema(description = "Telefone do usuário", example = "11987652341")
    private String telefone;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
