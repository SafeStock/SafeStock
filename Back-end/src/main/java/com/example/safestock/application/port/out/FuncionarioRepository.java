package com.example.safestock.application.port.out;

import com.example.safestock.domain.model.Funcionario;

public interface FuncionarioRepository {

    Funcionario save(Funcionario funcionario);
}
