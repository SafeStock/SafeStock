package com.example.safestock.application.service;

import com.example.safestock.application.port.out.RegistroUsoRepository;
import com.example.safestock.domain.model.RegistroUso;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistroUsoService {

    private final RegistroUsoRepository registroUsoRepository;

    public RegistroUsoService(RegistroUsoRepository registroUsoRepository) {
        this.registroUsoRepository = registroUsoRepository;
    }

    public RegistroUso registrarUso(RegistroUso registroUso){
        return registroUsoRepository.save(registroUso);
    }

    public List<RegistroUso> listarRegistrosUso(){
        return registroUsoRepository.findAll();
    }


//
//    public RegistroUso registrarUso (RegistroUso registroUso){
//        return registroUsoRepository.save(registroUso);
//    }
//
//    public List<RegistroUso> listarRegistrosUso(){
//        return registroUsoRepository.findAll();
//    }
//
//    public Long contarPordutosRetiradosDoEstoque() {
//        return registroUsoRepository.sumQuantidadeRegistroDeUso();
//    }
//
//    @Transactional
//    public void deletarRegistroUso(Long id) {
//        registroUsoRepository.deleteRelatoriosByRegistroUsoId(id);
//
//        registroUsoRepository.deleteById(id);
//    }
//
//    public void deletarRegistro(Long id) {
//        registroUsoRepository.deleteById(id);
//    }

}
