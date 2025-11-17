package com.example.safestock.model;
import com.example.safestock.model.Produto;
import com.example.safestock.model.RegistroUso;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "Relatorio")
@NoArgsConstructor @Getter @Setter
public class Relatorio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRelatorio;
    private LocalDateTime dataHoraEmissao;

    @ManyToOne
    @JoinColumn(name = "fkProduto")
    @JsonBackReference(value = "produto-relatorio")
    private Produto produto;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "fkRegistroUso")
    private RegistroUso registroUso;

    @ManyToOne
    @JoinColumn(name = "fkAlerta")
    private HistoricoAlertas alerta;
}
