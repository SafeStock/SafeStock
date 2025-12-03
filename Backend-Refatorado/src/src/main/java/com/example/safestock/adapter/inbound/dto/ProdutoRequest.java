package com.example.safestock.adapter.inbound.dto;

import com.example.safestock.domain.enuns.CategoriaProduto;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

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

    public class ProdutoCadastro {

        @Schema(description = "Nome do produto", example = "Candida")
        @NotNull
        private String nome;

        @Schema(description = "Categoria do produto", example = "CHAO")
        @NotNull
        private CategoriaProduto categoriaProduto;

        @Schema(description = "Quantidade do produto", example = "25")
        @NotNull
        private int quantidade;

        @Schema(description = "Limite de uso semanal do produto", example = "5")
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

    }

    public class ProdutoAtualizar {

        @Schema(description = "Nome do produto", example = "Candida")
        private String nome;

        @Schema(description = "Categoria do produto", example = "CHAO")
        private CategoriaProduto categoriaProduto;

        @Schema(description = "Quantidade do produto", example = "25")
        private int quantidade;

        @Schema(description = "Limite de uso semanal do produto", example = "5")
        private int limiteSemanalDeUso;

        @Schema(description = "Validade do produto", example = "2025-07-15")
        private LocalDate dataValidade;

        @Schema(description = "Entrada do produto", example = "2025-05-15")
        private LocalDate dataEntrada;
    }

    public class ProdutoListar {
        @Schema(description = "Id do produto", example = "1")
        private Long id;

        @Schema(description = "Nome do produto", example = "Candida")
        private String nome;

        @Schema(description = "Categoria do produto", example = "CHAO")
        private CategoriaProduto categoriaProduto;

        @Schema(description = "Quantidade do produto", example = "25")
        private int quantidade;

        // Getters e Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNome() { return nome; }
        public void setNome(String nome) { this.nome = nome; }
        public CategoriaProduto getCategoriaProduto() { return categoriaProduto; }
        public void setCategoriaProduto(CategoriaProduto categoriaProduto) { this.categoriaProduto = categoriaProduto; }
        public int getQuantidade() { return quantidade; }
        public void setQuantidade(int quantidade) { this.quantidade = quantidade; }
    }

    public class ProdutoRemover {

        @Schema(description = "Id do produto removido", example = "1")
        private Long id;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }
    }

    public record KpiQtd(Long qtd) {}




}