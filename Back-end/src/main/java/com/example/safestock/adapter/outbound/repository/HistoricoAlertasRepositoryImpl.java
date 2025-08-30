package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.application.port.out.HistoricoAlertasRepository;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.infrastructure.jpa.JpaHistoricoAlertasRepository;
import org.springframework.stereotype.Repository;

@Repository
public class HistoricoAlertasRepositoryImpl implements HistoricoAlertasRepository {

    private final JpaHistoricoAlertasRepository jpa;

    public HistoricoAlertasRepositoryImpl(JpaHistoricoAlertasRepository jpa) {
        this.jpa = jpa;
    }


    @Override
    public HistoricoAlertas save(HistoricoAlertas historicoAlertas) {
        return null;
    }
}
