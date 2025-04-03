package com.example.safestock.model;

import com.example.safestock.model.enums.TipoCreche;
import com.example.safestock.model.enums.TipoProduto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="produto")
@Getter @Setter @AllArgsConstructor @ToString
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private LocalDate dataEntrada;
    private LocalDate dataValidade;
    private TipoCreche categoria;

    public Produto() {}

    public Produto(String nome, LocalDate dataEntrada, LocalDate dataValidade, TipoCreche categoria) {
        this.nome = nome;
        this.dataEntrada = dataEntrada;
        this.dataValidade = dataValidade;
        this.categoria = categoria;
    }
}
