package com.example.safestock.infrastructure.entity;

import com.example.safestock.domain.enuns.CategoriaProduto;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "ProdutoV2")
public class ProdutoEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo nome não pode estar em branco")
    private String nome;

    @Enumerated(EnumType.STRING)
    private CategoriaProduto categoriaProduto;

    @NotNull(message = "O campo quantidade não pode estar em branco")
    @Min(value = 1, message = "O campo quantidade deve ser no mínimo 1")
    private int quantidade;

    private int limiteSemanalDeUso;

    private LocalDate dataValidade;

    private LocalDate dataEntrada;

    @ManyToOne
    @JoinColumn(name = "fkCreche")
    private CrecheEntity creche;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<RelatorioEntity> relatorios;

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

    public CategoriaProduto getCategoriaProduto() {
        return categoriaProduto;
    }

    public void setCategoriaProduto(CategoriaProduto categoriaProduto) {
        this.categoriaProduto = categoriaProduto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
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

    public CrecheEntity getCreche() {
        return creche;
    }

    public void setCreche(CrecheEntity creche) {
        this.creche = creche;
    }

    public List<RelatorioEntity> getRelatorios() {
        return relatorios;
    }

    public void setRelatorios(List<RelatorioEntity> relatorios) {
        this.relatorios = relatorios;
    }
}
