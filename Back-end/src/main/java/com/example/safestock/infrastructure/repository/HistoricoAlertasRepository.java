package com.example.safestock.infrastructure.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.safestock.core.domain.HistoricoAlertas;
import com.example.safestock.core.domain.Produto;
import com.example.safestock.core.domain.enuns.StatusAlerta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface HistoricoAlertasRepository extends JpaRepository<HistoricoAlertas, Long> {
    List<HistoricoAlertas> findByDataHoraAfter(LocalDateTime data);

    @Query("SELECT COUNT(a) > 0 FROM HistoricoAlertas a " +
            "WHERE a.produto = :produto " +
            "AND a.status = :status " +
            "AND a.dataHora > :data")

    boolean existsByProdutoAndStatusAndDataHoraAfter(
            @Param("produto") Produto produto,
            @Param("status") StatusAlerta status,
            @Param("data") LocalDateTime data);
}
