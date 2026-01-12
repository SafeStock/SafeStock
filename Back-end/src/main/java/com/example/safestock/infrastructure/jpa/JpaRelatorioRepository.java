package com.example.safestock.infrastructure.jpa;

import com.example.safestock.infrastructure.entity.RelatorioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaRelatorioRepository extends JpaRepository<RelatorioEntity, Long> {
}
