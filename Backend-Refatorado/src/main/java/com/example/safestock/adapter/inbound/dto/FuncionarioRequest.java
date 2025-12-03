package com.example.safestock.adapter.inbound.dto;

import com.example.safestock.domain.enuns.CargoFuncionario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FuncionarioRequest {

    @NotBlank
    private String nome;
    private String sobrenome;
    @NotNull
    private CargoFuncionario cargo;
    private String email;
    private String senha;
    private String telefone;
    private Long crecheId;


    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }
    public CargoFuncionario getCargo() { return cargo; }
    public void setCargo(CargoFuncionario cargo) { this.cargo = cargo; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public Long getCrecheId() { return crecheId; }
    public void setCrecheId(Long crecheId) { this.crecheId = crecheId; }
}