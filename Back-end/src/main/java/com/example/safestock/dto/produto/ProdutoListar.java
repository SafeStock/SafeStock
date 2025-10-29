package com.example.safestock.dto.produto;

import com.example.safestock.model.Creche;
import com.example.safestock.model.Relatorio;
import com.example.safestock.model.enums.CategoriaProduto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class ProdutoListar {

    @Schema(description = "Id do produto", example = "1")
    private Long id;

    @Size(min = 3, max = 25)
    @Schema(description = "Nome do produto", example = "Candida")
    private String nome;

    @Schema(description = "Categoria do produto", example = "Chão")
    private CategoriaProduto categoriaProduto;

    @Size(min = 0, max = 4)
    @Schema(description = "Quantidade do produto", example = "25")
    private int quantidade;

    @Schema(description = "Limite de uso do produto", example = "5")
    private int limiteSemanalDeUso;

    @Schema(description = "Validade do produto", example = "15/07/2025")
    private LocalDate dataValidade;

    @Schema(description = "Entrada do produto", example = "2025-05-15T10:30:00")
    private LocalDateTime dataEntrada;

    @Schema(description = "Creche do produto", example = "1")
    private Creche creche;

    @Schema(description = "Relatorio do produto", example = "1")
    private List<Relatorio> relatorio;

    public List<Relatorio> getRelatorio() {
        return relatorio;
    }

    public void setRelatorio(List<Relatorio> relatorio) {
        this.relatorio = relatorio;
    }

    public Creche getCreche() {
        return creche;
    }

    public void setCreche(Creche creche) {
        this.creche = creche;
    }

    public LocalDateTime getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(LocalDateTime dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public int getLimiteSemanalDeUso() {
        return limiteSemanalDeUso;
    }

    public void setLimiteSemanalDeUso(int limiteSemanalDeUso) {
        this.limiteSemanalDeUso = limiteSemanalDeUso;
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

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
