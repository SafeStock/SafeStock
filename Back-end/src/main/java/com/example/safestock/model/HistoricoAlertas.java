package com.example.safestock.model;

import com.example.safestock.model.enums.StatusAlerta;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "HistoricoAlertas")
public class HistoricoAlertas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime dataHora;
    private StatusAlerta status;
    private String descricao;


    private String nomeProduto;

    @OneToMany(mappedBy = "alerta")
    private List<Relatorio> relatorio;

    @ManyToOne
    @JoinColumn(name = "fkProduto")
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

    public void setProduto(Produto produto) {this.produto = produto;}
    public String getNomeProduto() {return nomeProduto;}

    public void setNomeProduto(String nomeProduto) {this.nomeProduto = nomeProduto;}
}
