package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.application.port.out.CrecheRepository;
import com.example.safestock.domain.model.Creche;
import com.example.safestock.infrastructure.entity.CrecheEntity;
import com.example.safestock.infrastructure.jpa.JpaCrecheRepository;
import org.springframework.stereotype.Repository;

@Repository
public class CrecheRepositoryImpl implements CrecheRepository {

    private final JpaCrecheRepository jpa;

    public CrecheRepositoryImpl(JpaCrecheRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Creche save(Creche creche) {
        return creche;
    }
}
