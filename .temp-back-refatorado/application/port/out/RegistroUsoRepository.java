package com.example.safestock.application.port.out;

import com.example.safestock.domain.model.RegistroUso;

import java.util.List;
import java.util.Optional;

public interface RegistroUsoRepository {

    RegistroUso save(RegistroUso registroUso);
    List<RegistroUso> findAll();
    Optional<RegistroUso> findById(Long id);
    void deleteById(Long id);
    Long sumQuantidadeRegistroDeUsoMes(int ano, int mes);
}
