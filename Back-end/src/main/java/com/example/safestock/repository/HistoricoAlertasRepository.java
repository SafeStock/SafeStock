package com.example.safestock.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.safestock.model.HistoricoAlertas;
import com.example.safestock.model.Produto;
import com.example.safestock.model.enums.StatusAlerta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.safestock.model.HistoricoAlertas;
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
