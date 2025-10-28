package com.example.safestock.adapter.inbound.dto;

import com.example.safestock.domain.enuns.CategoriaProduto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ProdutoRequest {

    @NotBlank
    private String nome;
    @NotNull
    private CategoriaProduto categoriaProduto;
    private int quantidade;
    private int limiteSemanalDeUso;
    private LocalDate dataValidade;
    private LocalDate dataEntrada;
    private Long crecheId;



    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public CategoriaProduto getCategoriaProduto() { return categoriaProduto; }
    public void setCategoriaProduto(CategoriaProduto categoriaProduto) { this.categoriaProduto = categoriaProduto; }
    public int getQuantidade() { return quantidade; }
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; }
    public int getLimiteSemanalDeUso() { return limiteSemanalDeUso; }
    public void setLimiteSemanalDeUso(int limiteSemanalDeUso) { this.limiteSemanalDeUso = limiteSemanalDeUso; }
    public LocalDate getDataValidade() { return dataValidade; }
    public void setDataValidade(LocalDate dataValidade) { this.dataValidade = dataValidade; }
    public LocalDate getDataEntrada() { return dataEntrada; }
    public void setDataEntrada(LocalDate dataEntrada) { this.dataEntrada = dataEntrada; }
    public Long getCrecheId() { return crecheId; }
    public void setCrecheId(Long crecheId) { this.crecheId = crecheId; }
}