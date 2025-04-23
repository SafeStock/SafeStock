package com.example.safestock.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="Creche")
@Getter @Setter @AllArgsConstructor  @ToString
public class Creche {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo nome não pode estar em branco")
    private String nome;

    @NotBlank(message = "O campo nome não pode estar em branco")
    private String endereco;

    @NotBlank(message = "O campo nome não pode estar em branco")
    @Pattern(regexp = "\\d{11}", message = "O campo telefone deve conter 11 caracteres")
    private String telefone;

    @NotBlank(message = "O campo nome não pode estar em branco")
    @Pattern(regexp = "\\d{14}", message = "O campo telefone deve conter 14 caracteres")
    private String cnpj;

    @OneToMany(mappedBy = "creche")
    private List<Funcionario> funcionario;

    @OneToMany(mappedBy = "creche")
    private List<Produto> produto;


    // Construtores
    public Creche() {};

    public Creche(String nome, String endereco, String telefone, String cnpj) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cnpj = cnpj;

    };

    // getters e setters POIS NO MEU (RAYANE) NÃO FUNCIONA O LOMBOK
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
}
