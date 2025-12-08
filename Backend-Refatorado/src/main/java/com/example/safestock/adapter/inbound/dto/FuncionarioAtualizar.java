package com.example.safestock.adapter.inbound.dto;

import com.example.safestock.domain.enuns.CargoFuncionario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FuncionarioAtualizar {
    
    @NotBlank(message = "O nome não pode estar em branco")
    private String nome;
    
    @NotBlank(message = "O sobrenome não pode estar em branco")
    private String sobrenome;
    
    @NotBlank(message = "O email não pode estar em branco")
    @Email(message = "Email inválido")
    private String email;
    
    @NotNull(message = "O cargo é obrigatório")
    private CargoFuncionario cargo;
    
    private String telefone;
    
    // ADICIONE ESTE CAMPO - FALTANDO NO SEU CÓDIGO
    @NotNull(message = "O ID da creche é obrigatório")
    private Long crecheId;

    // Getters e Setters
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Long getCrecheId() {
        return crecheId;
    }

    public void setCrecheId(Long crecheId) {
        this.crecheId = crecheId;
    }
}