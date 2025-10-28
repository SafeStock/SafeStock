package com.example.safestock.infrastructure.jpa;

import com.example.safestock.infrastructure.entity.ProdutoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaProdutoRepository extends JpaRepository<ProdutoEntity, Long> {
}
