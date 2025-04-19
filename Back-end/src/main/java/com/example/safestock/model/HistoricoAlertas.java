package com.example.safestock.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "HistoricoAlertas")
public class HistoricoAlertas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime dataHora;
    private String status;
    private String descricao;

    public HistoricoAlertas() {
    }

    public HistoricoAlertas(LocalDateTime dataHora, String status, String descricao) {
        this.dataHora = dataHora;
        this.status = status;
        this.descricao = descricao;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
