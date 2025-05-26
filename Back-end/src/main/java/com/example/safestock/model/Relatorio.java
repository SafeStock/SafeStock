package com.example.safestock.model;
import com.example.safestock.model.Produto;
import com.example.safestock.model.RegistroUso;
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
    private Integer idRelatorio;
    private LocalDateTime dataHoraEmissao;

    @ManyToOne
    @JoinColumn(name = "fkProduto")
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "fkRegistroUso")
    private RegistroUso registroUso;

    @ManyToOne
    @JoinColumn(name = "fkAlerta")
    private HistoricoAlertas alerta;
}
