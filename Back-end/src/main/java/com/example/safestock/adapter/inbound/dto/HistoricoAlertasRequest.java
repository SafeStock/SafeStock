package com.example.safestock.adapter.inbound.dto;

import com.example.safestock.domain.enuns.StatusAlerta;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;


public class HistoricoAlertasRequest {
    private LocalDateTime dataHora;
    private StatusAlerta status;
    private String descricao;
    private String nomeProduto;
    private Long produtoId;


    // getters/setters
    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }
    public StatusAlerta getStatus() { return status; }
    public void setStatus(StatusAlerta status) { this.status = status; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getNomeProduto() { return nomeProduto; }
    public void setNomeProduto(String nomeProduto) { this.nomeProduto = nomeProduto; }
    public Long getProdutoId() { return produtoId; }
    public void setProdutoId(Long produtoId) { this.produtoId = produtoId; }
}
