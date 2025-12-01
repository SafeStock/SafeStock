package com.example.safestock.domain.model;


import com.example.safestock.domain.enuns.StatusAlerta;

import java.time.LocalDateTime;
import java.util.List;

public class HistoricoAlertas {

    private Long id;
    private LocalDateTime dataHora;
    private StatusAlerta status;
    private String descricao;
    private String nomeProduto;
    private List<Relatorio> relatorio;
    private Produto produto;

    public HistoricoAlertas() {
    }

    public HistoricoAlertas(LocalDateTime dataHora, StatusAlerta status, String descricao, List<Relatorio> relatorio, Produto produto, String nomeProduto) {
        this.dataHora = dataHora;
        this.status = status;
        this.descricao = descricao;
        this.relatorio = relatorio;
        this.produto = produto;
        this.nomeProduto = nomeProduto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public StatusAlerta getStatus() {
        return status;
    }

    public void setStatus(StatusAlerta status) {
        this.status = status;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public List<Relatorio> getRelatorio() {
        return relatorio;
    }

    public void setRelatorio(List<Relatorio> relatorio) {
        this.relatorio = relatorio;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

}
