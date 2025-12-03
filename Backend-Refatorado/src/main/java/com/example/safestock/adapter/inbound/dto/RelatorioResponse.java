package com.example.safestock.adapter.inbound.dto;

import java.time.LocalDateTime;

public class RelatorioResponse {
    private Integer idRelatorio;
    private LocalDateTime dataRelatorio;
    private Long produtoId;
    private Long registroUsoId;
    private Long alertaId;


    // getters/setters
    public Integer getIdRelatorio() { return idRelatorio; }
    public void setIdRelatorio(Integer idRelatorio) { this.idRelatorio = idRelatorio; }
    public LocalDateTime getDataRelatorio() { return dataRelatorio; }
    public void setDataRelatorio(LocalDateTime dataRelatorio) { this.dataRelatorio = dataRelatorio; }
    public Long getProdutoId() { return produtoId; }
    public void setProdutoId(Long produtoId) { this.produtoId = produtoId; }
    public Long getRegistroUsoId() { return registroUsoId; }
    public void setRegistroUsoId(Long registroUsoId) { this.registroUsoId = registroUsoId; }
    public Long getAlertaId() { return alertaId; }
    public void setAlertaId(Long alertaId) { this.alertaId = alertaId; }
}
