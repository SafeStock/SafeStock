package com.example.safestock.application.port.in;

import com.example.safestock.domain.model.RegistroUso;
import java.util.List;

public interface RegistroUsoUseCase {

    RegistroUso criar(RegistroUso registroUso);
    List<RegistroUso> listar();
    void deletar(Long id);
}