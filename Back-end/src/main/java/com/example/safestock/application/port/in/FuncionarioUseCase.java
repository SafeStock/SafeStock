package com.example.safestock.application.port.in;

import com.example.safestock.domain.model.Funcionario;

import java.util.List;

public interface FuncionarioUseCase {

//    Funcionario criar(Funcionario funcionario);

    List<Funcionario> buscarFuncionarios();

    void deletarFuncionario(Long id);
}
