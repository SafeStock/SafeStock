package com.example.safestock.core.application.usecase;

import com.example.safestock.core.domain.RegistroUso;
import com.example.safestock.infrastructure.repository.RegistroUsoRepository;
import jakarta.transaction.Transactional;
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

    public Long contarPordutosRetiradosDoEstoque() {
        return registroUsoRepository.sumQuantidadeRegistroDeUso();
    }

    @Transactional
    public void deletarRegistroUso(Long id) {
        // Primeiro deleta os relatórios associados
        registroUsoRepository.deleteRelatoriosByRegistroUsoId(id);

        // Depois deleta o registro de uso
        registroUsoRepository.deleteById(id);
    }

    public void deletarRegistro(Long id) {
        registroUsoRepository.deleteById(id);
    }

}
