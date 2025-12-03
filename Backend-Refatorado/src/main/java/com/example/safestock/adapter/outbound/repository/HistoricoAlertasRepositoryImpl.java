package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.adapter.outbound.mapper.HistoricoAlertasMapper;
import com.example.safestock.adapter.outbound.mapper.ProdutoMapper;
import com.example.safestock.application.port.out.HistoricoAlertasRepository;
import com.example.safestock.domain.enuns.StatusAlerta;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.infrastructure.entity.HistoricoAlertasEntity;
import com.example.safestock.infrastructure.entity.ProdutoEntity;
import com.example.safestock.infrastructure.jpa.JpaHistoricoAlertasRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
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
    
    @Override
    public boolean existsByProdutoAndStatusAndDataHoraAfter(Produto produto, StatusAlerta status, LocalDateTime dataHora) {
        ProdutoEntity produtoEntity = ProdutoMapper.toEntity(produto);
        return jpa.existsByProdutoAndStatusAndDataHoraAfter(produtoEntity, status, dataHora);
    }
    
    @Override
    public void deleteByProduto(Produto produto) {
        ProdutoEntity produtoEntity = ProdutoMapper.toEntity(produto);
        jpa.deleteByProduto(produtoEntity);
    }
}
