package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.adapter.outbound.mapper.HistoricoAlertasMapper;
import com.example.safestock.application.port.out.HistoricoAlertasRepository;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.infrastructure.entity.HistoricoAlertasEntity;
import com.example.safestock.infrastructure.jpa.JpaHistoricoAlertasRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class HistoricoAlertasRepositoryImpl implements HistoricoAlertasRepository {

    private final JpaHistoricoAlertasRepository jpa;

    public HistoricoAlertasRepositoryImpl(JpaHistoricoAlertasRepository jpa) {
        this.jpa = jpa;
    }


    @Override
    public HistoricoAlertas save(HistoricoAlertas historicoAlertas) {
        HistoricoAlertasEntity entity = HistoricoAlertasMapper.toEntity(historicoAlertas);
        HistoricoAlertasEntity saved = jpa.save(entity);
        return HistoricoAlertasMapper.toDomain(saved);
    }

    @Override
    public List<HistoricoAlertas> findAll() {
        return jpa.findAll().stream()
                .map(HistoricoAlertasMapper::toDomain)
                .collect(Collectors.toList());
    }
}
