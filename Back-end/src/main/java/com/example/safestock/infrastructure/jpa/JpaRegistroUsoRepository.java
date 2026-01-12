package com.example.safestock.infrastructure.jpa;

import com.example.safestock.infrastructure.entity.RegistroUsoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaRegistroUsoRepository extends JpaRepository<RegistroUsoEntity, Long> {
}
