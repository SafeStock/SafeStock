package com.example.safestock.dto.produto;

import com.example.safestock.model.enums.CategoriaProduto;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ProdutoCadastro {

    @Schema(description = "Nome do produto", example = "Candida")
    @NotNull
    private String nome;

    @Schema(description = "Categoria do produto", example = "chao")
    @NotNull
    private CategoriaProduto categoriaProduto;

    @Schema(description = "Quantidade do produto", example = "25")
    @NotNull
    private int quantidade;

    @Schema(description = "Limite de uso do produto", example = "5")
    @NotNull
    private int limiteSemanalDeUso;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "Validade do produto", example = "2025-07-15")
    @NotNull
    private LocalDate dataValidade;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "Entrada do produto", example = "2025-05-15")
    @NotNull
    private LocalDate dataEntrada;

    @Schema(description = "Id da creche", example = "1")
    @NotNull
    private Long crecheId;

    // Getters e Setters
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
