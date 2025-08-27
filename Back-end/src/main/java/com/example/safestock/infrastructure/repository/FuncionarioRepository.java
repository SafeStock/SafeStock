package com.example.safestock.infrastructure.repository;

import com.example.safestock.core.domain.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FuncionarioRepository  extends JpaRepository<Funcionario, Long> {

    Optional<Funcionario> findByEmail(String email);
}
