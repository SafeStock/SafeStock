package com.example.safestock.infrastructure.entity;

import com.example.safestock.domain.enuns.CategoriaProduto;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Produto")
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
}
