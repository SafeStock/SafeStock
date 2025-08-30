package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.application.port.out.FuncionarioRepository;
import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.infrastructure.jpa.JpaFuncionarioRepository;
import org.springframework.stereotype.Repository;

@Repository
public class FuncionarioRepositoryImpl implements FuncionarioRepository {

    private final JpaFuncionarioRepository jpa;

    public FuncionarioRepositoryImpl(JpaFuncionarioRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Funcionario save(Funcionario funcionario) {
        return null;
    }
}
