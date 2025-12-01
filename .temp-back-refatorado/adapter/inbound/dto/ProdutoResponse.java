package com.example.safestock.adapter.inbound.dto;

import com.example.safestock.domain.enuns.CategoriaProduto;

import java.time.LocalDate;

public class ProdutoResponse {
    private Long id;
    private String nome;
    private int quantidade;
    private int limiteSemanalDeUso;
    private LocalDate dataValidade;
    private LocalDate dataEntrada;
    private Long crecheId;

    public ProdutoResponse() {
    }

    public ProdutoResponse(Long id, String nome, int quantidade, int limiteSemanalDeUso, LocalDate dataValidade, LocalDate dataEntrada, Long crecheId) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.limiteSemanalDeUso = limiteSemanalDeUso;
        this.dataValidade = dataValidade;
        this.dataEntrada = dataEntrada;
        this.crecheId = crecheId;
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
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

    public record ProdutoRespons(
            Long id,
            String nome,
            CategoriaProduto categoriaProduto,
            int quantidade,
            LocalDate dataValidade,
            LocalDate dataEntrada,
            Long crecheId
    ) {}

    public record ProdutoListarResponse(
            Long id,
            String nome,
            CategoriaProduto categoriaProduto,
            int quantidade,
            LocalDate dataValidade
    ) {}

    public record KpiQtdResponse(Long qtd) {}
}
