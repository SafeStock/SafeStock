package com.example.safestock.application.service;

import com.example.safestock.application.port.in.RegistroUsoUseCase;
import com.example.safestock.application.port.out.RegistroUsoRepository;
import com.example.safestock.domain.model.RegistroUso;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("registroUsoServiceV2")
public class RegistroUsoService implements RegistroUsoUseCase {

    private final RegistroUsoRepository registroUsoRepository;

    public RegistroUsoService(@Qualifier("registroUsoRepositoryImpl") RegistroUsoRepository registroUsoRepository) {
        this.registroUsoRepository = registroUsoRepository;
    }

    @Override
    public RegistroUso criar(RegistroUso registroUso) {
        // Regras de negócio aqui (ex: validações)
        return registroUsoRepository.save(registroUso);
    }

    @Override
    public List<RegistroUso> listar() {
        // Regras de negócio aqui (ex: validações)
        return registroUsoRepository.findAll();
    }

    @Override
    public void deletar(Long id) {
        // Regras de negócio aqui (ex: validações)
        registroUsoRepository.deleteById(id);
    }
}
