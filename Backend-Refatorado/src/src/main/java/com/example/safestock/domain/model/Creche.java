package com.example.safestock.domain.model;

import java.util.List;

public class Creche {

    private Long id;
    private String nome;
    private String endereco;
    private String telefone;
    private String cnpj;
    private List<Funcionario> funcionario;
    private List<Produto> produto;

    public Creche() {};

    public Creche(String nome, String endereco, String telefone, String cnpj) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cnpj = cnpj;

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

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public List<Funcionario> getFuncionarios() {
        return funcionario;
    }

    public void setFuncionarios(List<Funcionario> funcionario) {
        this.funcionario = funcionario;
    }

    public List<Produto> getProdutos() {
        return produto;
    }

    public void setProdutos(List<Produto> produto) {
        this.produto = produto;
    }
}
