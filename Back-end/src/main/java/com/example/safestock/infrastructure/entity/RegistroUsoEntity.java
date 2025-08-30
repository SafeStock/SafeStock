package com.example.safestock.infrastructure.entity;

import com.example.safestock.model.Funcionario;
import com.example.safestock.model.Relatorio;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "RegistroUso")
public class RegistroUsoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String produto;

    private LocalDate dataValidade;

    @Positive(message = "A quantidade deve ser maior que zero")
    private int quantidade;

    private LocalDateTime dataHoraSaida;

    @ManyToOne
    @JoinColumn(name = "fkFuncionario")
    private Funcionario funcionario;

    @OneToMany(mappedBy = "registroUso", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Relatorio> relatorio;

    public RegistroUsoEntity() {
    }

    public RegistroUsoEntity(String produto, LocalDate dataValidade, int quantidade, LocalDateTime dataHoraSaida) {
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
