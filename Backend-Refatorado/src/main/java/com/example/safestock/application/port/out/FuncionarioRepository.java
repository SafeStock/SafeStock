package com.example.safestock.application.port.out;

import com.example.safestock.domain.enuns.CargoFuncionario;
import com.example.safestock.domain.model.Funcionario;

import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository {

    List<Funcionario> buscarPorEmailDiferenteECargoDiferente(String email, CargoFuncionario cargo);

    Optional<Funcionario> buscarFuncionarioId(Long id);

    void deleteFuncionario(Long id);

    Optional<Funcionario> buscarFuncionarioPorEmail(String email);
}
