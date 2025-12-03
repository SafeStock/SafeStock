package com.example.safestock.domain.model;

import com.example.safestock.domain.enuns.CargoFuncionario;

import java.util.List;

public class Funcionario {

    private Long id;
    private String nome;
    private String sobrenome;
    private CargoFuncionario cargo;
    private String email;
    private String senha;
    private String telefone;
    private Creche creche;
    private List<RegistroUso> registroUso;

    public Funcionario() {};

    public Funcionario(String nome, String sobrenome, CargoFuncionario cargo, String email, String senha, String telefone) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cargo = cargo;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
    }

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

    public Creche getCreche() {
        return creche;
    }

    public void setCreche(Creche creche) {
        this.creche = creche;
    }

    public List<RegistroUso> getRegistroUso() {
        return registroUso;
    }

    public void setRegistroUso(List<RegistroUso> registroUso) {
        this.registroUso = registroUso;
    }
}
