package com.example.safestock.core.dto.funcionario;

import com.example.safestock.core.domain.enuns.CargoFuncionario;
import io.swagger.v3.oas.annotations.media.Schema;

public class FuncionarioAtualizar {
    @Schema(description = "Id do usuário", example = "1")
    private Long id;

    @Schema(description = "Nome do usuário", example = "John Doe")
    private String nome;

    @Schema(description = "Sobrenome do usuário", example = "John Doe")
    private String sobrenome;

    @Schema(description = "Email do usuário", example = "John@doe.com")
    private String email;

    @Schema(description = "Senha do usuário", example = "0424542@jj")
    private String senha;

    @Schema(description = "Telefone do usuário", example = "11987652341")
    private String telefone;

    @Schema(description = "Cargo do usuário", example = "Dono")
    private CargoFuncionario cargo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
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

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
