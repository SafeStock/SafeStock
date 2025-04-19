package com.example.safestock.repository;

import com.example.safestock.model.HistoricoAlertas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoAlertasRepository extends JpaRepository<HistoricoAlertas, Long> {
}
