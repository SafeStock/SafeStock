package com.example.safestock.model;

import com.example.safestock.model.enums.CategoriaProduto;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="Produto")
@Getter @Setter @AllArgsConstructor @ToString
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo nome não pode estar em branco")
    private String nome;

    private CategoriaProduto categoriaProduto;

    @NotNull(message = "O campo quantidade não pode estar em branco")
    @Min(value = 1, message = "O campo quantidade deve ser no mínimo 1")
    private int quantidade;


    private int limiteSemanalDeUso;
    private LocalDate dataValidade;
    private LocalDate dataEntrada;

    @ManyToOne
    @JoinColumn(name = "fkCreche")
    @JsonBackReference(value = "creche-produto")
    private Creche creche;

    @OneToMany(mappedBy = "produto")
    private List<Relatorio> relatorio;

    public Produto() {
    }

    public Produto(String nome, CategoriaProduto categoriaProduto, int quantidade, int limiteSemanalDeUso, LocalDate dataValidade, LocalDate dataEntrada) {
        this.nome = nome;
        this.categoriaProduto = categoriaProduto;
        this.quantidade = quantidade;
        this.limiteSemanalDeUso = limiteSemanalDeUso;
        this.dataValidade = dataValidade;
        this.dataEntrada = dataEntrada;
    }

    // getters e setters
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

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public CategoriaProduto getCategoriaProduto() {
        return categoriaProduto;
    }

    public void setCategoriaProduto(CategoriaProduto categoriaProduto) {
        this.categoriaProduto = categoriaProduto;
    }

    public int getLimiteSemanalDeUso() {
        return limiteSemanalDeUso;
    }

    public void setLimiteSemanalDeUso(int limiteSemanalDeUso) {
        this.limiteSemanalDeUso = limiteSemanalDeUso;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public LocalDate getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(LocalDate dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public Creche getCreche() {return creche;}

    public void setCreche(Creche creche) {this.creche = creche;}

    public List<Relatorio> getRelatorio() {return relatorio;}

    public void setRelatorio(List<Relatorio> relatorio) {this.relatorio = relatorio;}


}
