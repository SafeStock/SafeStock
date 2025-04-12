package com.example.safestock.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "registroUso")
public class RegistroUso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String produto;
    private LocalDate dataValidade;
    private int quantidade;
    private LocalDateTime dataHoraSaida;

    public RegistroUso() {
    }

    public RegistroUso(String produto, LocalDate dataValidade, int quantidade, LocalDateTime dataHoraSaida) {
        this.produto = produto;
        this.dataValidade = dataValidade;
        this.quantidade = quantidade;
        this.dataHoraSaida = dataHoraSaida;
    }

    public String getProduto() {
        return produto;
    }

    public void setProduto(String produto) {
        this.produto = produto;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public LocalDateTime getDataHoraSaida() {
        return dataHoraSaida;
    }

    public void setDataHoraSaida(LocalDateTime dataHoraSaida) {
        this.dataHoraSaida = dataHoraSaida;
    }
}
