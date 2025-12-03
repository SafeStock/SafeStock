package com.example.safestock.infrastructure.jpa;

import com.example.safestock.domain.enuns.StatusAlerta;
import com.example.safestock.infrastructure.entity.HistoricoAlertasEntity;
import com.example.safestock.infrastructure.entity.ProdutoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface JpaHistoricoAlertasRepository extends JpaRepository<HistoricoAlertasEntity, Long> {
    
    boolean existsByProdutoAndStatusAndDataHoraAfter(ProdutoEntity produto, StatusAlerta status, LocalDateTime dataHora);
    
    void deleteByProduto(ProdutoEntity produto);
}
