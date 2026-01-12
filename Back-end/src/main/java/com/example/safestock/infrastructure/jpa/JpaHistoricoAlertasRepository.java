package com.example.safestock.infrastructure.jpa;

import com.example.safestock.infrastructure.entity.HistoricoAlertasEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaHistoricoAlertasRepository extends JpaRepository<HistoricoAlertasEntity, Long> {
}
