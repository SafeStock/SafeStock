package com.example.safestock.application.port.out;

import com.example.safestock.domain.model.Funcionario;

import java.util.List;

public interface FuncionarioRepository {

//    Funcionario save(Funcionario funcionario);

    List<Funcionario> buscarFuncionario();

    void deleteFuncionario(Long id);
}
