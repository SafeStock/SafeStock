package com.example.safestock.service;

import com.example.safestock.model.RegistroUso;
import com.example.safestock.repository.RegistroUsoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistroUsoService {
    private final RegistroUsoRepository registroUsoRepository;

    public RegistroUsoService(RegistroUsoRepository registroUsoRepository) {
        this.registroUsoRepository = registroUsoRepository;
    }

    public RegistroUso registrarUso (RegistroUso registroUso){
        return registroUsoRepository.save(registroUso);
    }

    public List<RegistroUso> listarRegistrosUso(){
        return registroUsoRepository.findAll();
    }
}
