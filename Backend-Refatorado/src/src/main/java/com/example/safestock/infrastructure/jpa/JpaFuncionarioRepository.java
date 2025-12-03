package com.example.safestock.infrastructure.jpa;

import com.example.safestock.domain.enuns.CargoFuncionario;
import com.example.safestock.infrastructure.entity.FuncionarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaFuncionarioRepository extends JpaRepository<FuncionarioEntity, Long> {
    Optional<FuncionarioEntity> findByEmail(String email);
    List<FuncionarioEntity> findByEmailNotAndCargoNot(String email, CargoFuncionario cargo);
}
