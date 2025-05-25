package com.example.safestock.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "HistoricoAlerta")
@NoArgsConstructor @Getter @Setter
public class HistoricoAlerta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHistoricoAlerta;
    private LocalDateTime dataHora;
    private String status;
    private String descricao;

    @OneToMany(mappedBy = "alerta")
    private List<Relatorio> relatorio;
}

