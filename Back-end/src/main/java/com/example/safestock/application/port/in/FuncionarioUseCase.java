package com.example.safestock.application.port.in;

import com.example.safestock.domain.model.Funcionario;

import java.util.List;
import java.util.Optional;

public interface FuncionarioUseCase {

//    Funcionario criar(Funcionario funcionario);

    List<Funcionario> buscarFuncionarios();

    Optional<Funcionario> buscarFuncionarioPorId(Long id);

    void deletarFuncionario(Long id);
}
