package com.example.safestock.domain.model;

import java.time.LocalDateTime;

public class Relatorio {

    private Integer idRelatorio;
    private LocalDateTime dataRelatorio;
    private Produto produto;
    private RegistroUso registroUso;
    private HistoricoAlertas alerta;

    public Integer getIdRelatorio() {
        return idRelatorio;
    }

    public void setIdRelatorio(Integer idRelatorio) {
        this.idRelatorio = idRelatorio;
    }

    public LocalDateTime getDataRelatorio() {
        return dataRelatorio;
    }

    public void setDataRelatorio(LocalDateTime dataRelatorio) {
        this.dataRelatorio = dataRelatorio;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public RegistroUso getRegistroUso() {
        return registroUso;
    }

    public void setRegistroUso(RegistroUso registroUso) {
        this.registroUso = registroUso;
    }

    public HistoricoAlertas getAlerta() {
        return alerta;
    }

    public void setAlerta(HistoricoAlertas alerta) {
        this.alerta = alerta;
    }
}
