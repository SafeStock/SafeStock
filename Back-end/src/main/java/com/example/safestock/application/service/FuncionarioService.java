package com.example.safestock.application.service;

import com.example.safestock.application.port.in.FuncionarioUseCase;
import com.example.safestock.application.port.out.FuncionarioRepository;
import com.example.safestock.domain.model.Funcionario;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("funcionarioServiceV2")
public class FuncionarioService implements FuncionarioUseCase {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

//    @Override
//    public Funcionario criar(Funcionario funcionario) {
//        // Regras de negócio aqui (ex: validações)
//        return funcionarioRepository.save(funcionario);
//    }

    @Override
    public List<Funcionario> buscarFuncionarios() {
        return funcionarioRepository.buscarFuncionario();
    }

    @Override
    public void deletarFuncionario(Long id) {
        funcionarioRepository.deleteFuncionario(id);
    }
}
