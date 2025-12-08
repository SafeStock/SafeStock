package com.example.safestock.application.port.out;

import com.example.safestock.domain.model.Creche;

import java.util.Optional;

public interface CrecheRepository {

    Creche save (Creche creche);
    
    Optional<Creche> findById(Long id);

    Optional<Creche> buscarPorId(Long id);
}
