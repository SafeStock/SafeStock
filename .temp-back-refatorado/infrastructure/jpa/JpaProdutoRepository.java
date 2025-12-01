package com.example.safestock.infrastructure.jpa;

import com.example.safestock.infrastructure.entity.ProdutoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface JpaProdutoRepository extends JpaRepository<ProdutoEntity, Long> {

    // Produtos próximos da validade (entre hoje e 7 dias)
    @Query("SELECT p FROM ProdutoEntity p WHERE p.dataValidade BETWEEN :inicio AND :fim")
    List<ProdutoEntity> findProdutosProximosDaValidade(LocalDate inicio, LocalDate fim);

    @Query("SELECT COUNT(p) FROM ProdutoEntity p WHERE p.dataValidade BETWEEN :inicio AND :fim")
    Long countProdutosProximosDaValidade(LocalDate inicio, LocalDate fim);

    // Produtos próximos do limite de uso
    @Query("SELECT p FROM ProdutoEntity p WHERE p.quantidade <= p.limiteSemanalDeUso")
    List<ProdutoEntity> findProdutosProximosLimiteUso();

    @Query("SELECT COUNT(p) FROM ProdutoEntity p WHERE p.quantidade <= p.limiteSemanalDeUso")
    Long countProdutosProximosLimiteUso();
}
