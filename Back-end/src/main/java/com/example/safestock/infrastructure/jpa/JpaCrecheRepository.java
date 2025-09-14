package com.example.safestock.infrastructure.jpa;

import com.example.safestock.infrastructure.entity.CrecheEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCrecheRepository extends JpaRepository<CrecheEntity, Long> {
}
