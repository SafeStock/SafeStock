package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.adapter.outbound.mapper.RelatorioMapper;
import com.example.safestock.application.port.out.RelatorioRepository;
import com.example.safestock.domain.model.Relatorio;
import com.example.safestock.infrastructure.entity.RelatorioEntity;
import com.example.safestock.infrastructure.jpa.JpaRelatorioRepository;
import org.springframework.stereotype.Repository;

@Repository("relatorioRepositoryImpl")
public class RelatorioRepositoryImpl implements RelatorioRepository {

    private final JpaRelatorioRepository jpa;

    public RelatorioRepositoryImpl(JpaRelatorioRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Relatorio save(Relatorio relatorio) {
        RelatorioEntity entity = RelatorioMapper.toEntity(relatorio);
        RelatorioEntity saved = jpa.save(entity);
        return RelatorioMapper.toDomain(saved);
    }
}
