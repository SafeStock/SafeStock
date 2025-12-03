package com.example.safestock.application.port.in;

import com.example.safestock.domain.model.Creche;

import java.util.Optional;

public interface CrecheUseCase {

    Creche criar(Creche creche);
    
    Optional<Creche> buscarPorId(Long id);
}
