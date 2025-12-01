package com.example.safestock.domain.model;

import com.example.safestock.domain.enuns.CategoriaProduto;

import java.time.LocalDate;
import java.util.List;

public class Produto {

    private Long id;
    private String nome;
    private CategoriaProduto categoriaProduto;
    private int quantidade;
    private int limiteSemanalDeUso;
    private LocalDate dataValidade;
    private LocalDate dataEntrada;
    private Creche creche;
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

    public Produto(Long id, String nome, CategoriaProduto categoriaProduto, int quantidade, int limiteSemanalDeUso, LocalDate dataValidade, LocalDate dataEntrada, Long aLong) {
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

    public Creche getCreche() {
        return creche;
    }

    public void setCreche() {
        this.creche = creche;
    }

    public List<Relatorio> getRelatorio() {
        return relatorio;
    }

    public void setRelatorio(List<Relatorio> relatorio) {
        this.relatorio = relatorio;
    }



}
