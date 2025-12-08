package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.adapter.outbound.mapper.CrecheMapper;
import com.example.safestock.application.port.out.CrecheRepository;
import com.example.safestock.domain.model.Creche;
import com.example.safestock.infrastructure.entity.CrecheEntity;
import com.example.safestock.infrastructure.jpa.JpaCrecheRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class CrecheRepositoryImpl implements CrecheRepository {

    private final JpaCrecheRepository jpa;

    public CrecheRepositoryImpl(JpaCrecheRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Creche save(Creche creche) {
        CrecheEntity entity = CrecheMapper.toEntity(creche);
        CrecheEntity saved = jpa.save(entity);
        return CrecheMapper.toDomain(saved);
    }
    
    @Override
    public Optional<Creche> findById(Long id) {
        return jpa.findById(id).map(CrecheMapper::toDomain);
    }
    
    @Override
    public Optional<Creche> buscarPorId(Long id) {
        return findById(id); // Reaproveita o findById
    }
}
