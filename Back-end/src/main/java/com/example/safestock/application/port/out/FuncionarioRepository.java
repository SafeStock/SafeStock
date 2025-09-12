package com.example.safestock.application.port.out;

import com.example.safestock.domain.model.Funcionario;

import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository {

//    Funcionario save(Funcionario funcionario);

    List<Funcionario> buscarFuncionario();

    Optional<Funcionario> buscarFuncionarioId(Long id);

    void deleteFuncionario(Long id);
}
