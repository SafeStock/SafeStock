package com.example.safestock.application.service;

import com.example.safestock.application.port.in.CrecheUseCase;
import com.example.safestock.application.port.out.CrecheRepository;
import com.example.safestock.domain.model.Creche;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class CrecheService implements CrecheUseCase {

    private final CrecheRepository crecheRepository;

    public CrecheService(CrecheRepository crecheRepository) {
        this.crecheRepository = crecheRepository;
    }

    @Override
    public Creche criar(Creche creche) {
        // Regras de negócio aqui (ex: validações)
        return crecheRepository.save(creche);
    }
}
