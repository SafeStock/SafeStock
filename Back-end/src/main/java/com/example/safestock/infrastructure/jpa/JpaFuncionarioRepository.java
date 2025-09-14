package com.example.safestock.infrastructure.jpa;

import com.example.safestock.infrastructure.entity.FuncionarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaFuncionarioRepository extends JpaRepository<FuncionarioEntity, Long> {
}
