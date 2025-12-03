package com.example.safestock.adapter.inbound.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class RelatorioRequest {
    @NotNull
    private Long produtoId;
    private Long registroUsoId;
    private Long alertaId;
    private LocalDateTime dataRelatorio;


    // getters/setters
    public Long getProdutoId() { return produtoId; }
    public void setProdutoId(Long produtoId) { this.produtoId = produtoId; }
    public Long getRegistroUsoId() { return registroUsoId; }
    public void setRegistroUsoId(Long registroUsoId) { this.registroUsoId = registroUsoId; }
    public Long getAlertaId() { return alertaId; }
    public void setAlertaId(Long alertaId) { this.alertaId = alertaId; }
    public LocalDateTime getDataRelatorio() { return dataRelatorio; }
    public void setDataRelatorio(LocalDateTime dataRelatorio) { this.dataRelatorio = dataRelatorio; }
}
