package com.example.safestock.infrastructure.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Relatorio")
public class RelatorioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRelatorio;

    private LocalDateTime dataRelatorio;

    @ManyToOne
    @JoinColumn(name = "fkProduto")
    private ProdutoEntity produto;

    @ManyToOne
    @JoinColumn(name = "fkRegistroUso")
    private RegistroUsoEntity registroUso;

    @ManyToOne
    @JoinColumn(name = "fkAlerta")
    private HistoricoAlertasEntity alerta;

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

    public ProdutoEntity getProduto() {
        return produto;
    }

    public void setProduto(ProdutoEntity produto) {
        this.produto = produto;
    }

    public RegistroUsoEntity getRegistroUso() {
        return registroUso;
    }

    public void setRegistroUso(RegistroUsoEntity registroUso) {
        this.registroUso = registroUso;
    }

    public HistoricoAlertasEntity getAlerta() {
        return alerta;
    }

    public void setAlerta(HistoricoAlertasEntity alerta) {
        this.alerta = alerta;
    }
}
