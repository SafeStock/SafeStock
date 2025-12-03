package com.example.safestock.infrastructure.entity;

import com.example.safestock.domain.enuns.StatusAlerta;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "HistoricoAlertas")
public class HistoricoAlertasEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    private StatusAlerta status;

    private String descricao;

    private String nomeProduto;

    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<RelatorioEntity> relatorio;

    @ManyToOne
    @JoinColumn(name = "fkProduto")
    private ProdutoEntity produto;

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

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public List<RelatorioEntity> getRelatorio() {
        return relatorio;
    }

    public void setRelatorio(List<RelatorioEntity> relatorio) {
        this.relatorio = relatorio;
    }

    public ProdutoEntity getProduto() {
        return produto;
    }

    public void setProduto(ProdutoEntity produto) {
        this.produto = produto;
    }
}
