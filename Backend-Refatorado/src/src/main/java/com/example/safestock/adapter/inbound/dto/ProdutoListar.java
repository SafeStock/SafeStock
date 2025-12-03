package com.example.safestock.adapter.inbound.dto;

import com.example.safestock.domain.enuns.CategoriaProduto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ProdutoListar {
    private Long id;
    private String nome;
    private CategoriaProduto categoriaProduto;
    private Integer quantidade;
    private Integer limiteSemanalDeUso;
    private LocalDate dataValidade;
    private LocalDateTime dataEntrada;
    private Long crecheId;

    public ProdutoListar() {
    }

    public ProdutoListar(Long id, String nome, CategoriaProduto categoriaProduto, Integer quantidade, 
                        Integer limiteSemanalDeUso, LocalDate dataValidade, LocalDateTime dataEntrada, Long crecheId) {
        this.id = id;
        this.nome = nome;
        this.categoriaProduto = categoriaProduto;
        this.quantidade = quantidade;
        this.limiteSemanalDeUso = limiteSemanalDeUso;
        this.dataValidade = dataValidade;
        this.dataEntrada = dataEntrada;
        this.crecheId = crecheId;
    }

    // Getters e Setters
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

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Integer getLimiteSemanalDeUso() {
        return limiteSemanalDeUso;
    }

    public void setLimiteSemanalDeUso(Integer limiteSemanalDeUso) {
        this.limiteSemanalDeUso = limiteSemanalDeUso;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public LocalDateTime getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(LocalDateTime dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public Long getCrecheId() {
        return crecheId;
    }

    public void setCrecheId(Long crecheId) {
        this.crecheId = crecheId;
    }
}
