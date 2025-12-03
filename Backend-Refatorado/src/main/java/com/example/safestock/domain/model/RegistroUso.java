package com.example.safestock.domain.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class RegistroUso {

    private Long id;
    private String produto;
    private LocalDate dataValidade;
    private int quantidade;
    private LocalDateTime dataHoraSaida;
    private Funcionario funcionario;
    private List<Relatorio> relatorio;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public List<Relatorio> getRelatorio() {
        return relatorio;
    }

    public void setRelatorio(List<Relatorio> relatorio) {
        this.relatorio = relatorio;
    }

}
