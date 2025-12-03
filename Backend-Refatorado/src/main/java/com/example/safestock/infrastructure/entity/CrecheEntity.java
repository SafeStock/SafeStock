package com.example.safestock.infrastructure.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.List;

@Entity
@Table(name = "Creche")
public class CrecheEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo nome não pode estar em branco")
    private String nome;

    @NotBlank(message = "O campo endereço não pode estar em branco")
    private String endereco;

    @NotBlank(message = "O campo telefone não pode estar em branco")
    @Pattern(regexp = "\\d{11}", message = "O campo telefone deve conter 11 caracteres")
    private String telefone;

    @NotBlank(message = "O campo cnpj não pode estar em branco")
    @Pattern(regexp = "\\d{14}", message = "O campo cnpj deve conter 14 caracteres")
    private String cnpj;

    @OneToMany(mappedBy = "creche", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<FuncionarioEntity> funcionarios;

    @OneToMany(mappedBy = "creche", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<ProdutoEntity> produtos;

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

    public List<FuncionarioEntity> getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(List<FuncionarioEntity> funcionarios) {
        this.funcionarios = funcionarios;
    }

    public List<ProdutoEntity> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<ProdutoEntity> produtos) {
        this.produtos = produtos;
    }
}
