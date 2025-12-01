package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.application.port.out.ProdutoRepository;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.adapter.outbound.mapper.ProdutoMapper;
import com.example.safestock.infrastructure.jpa.JpaProdutoRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
public class ProdutoRepositoryImpl implements ProdutoRepository {

    private final JpaProdutoRepository jpaRepository;

    public ProdutoRepositoryImpl(JpaProdutoRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Produto save(Produto produto) {
        var savedEntity = jpaRepository.save(ProdutoMapper.toEntity(produto));
        return ProdutoMapper.toDomain(savedEntity);
    }

    @Override
    public List<Produto> findAll() {
        return jpaRepository.findAll().stream()
                .map(ProdutoMapper::toDomain)
                .toList();
    }

    @Override
    public Optional<Produto> findById(Long id) {
        return jpaRepository.findById(id).map(ProdutoMapper::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public Long count() {
        return jpaRepository.count();
    }

    // KPI
    @Override
    public List<Produto> findProdutosProximosDaValidade(LocalDate inicio, LocalDate fim) {
        return jpaRepository.findProdutosProximosDaValidade(inicio, fim).stream()
                .map(ProdutoMapper::toDomain)
                .toList();
    }

    @Override
    public Long countProdutosProximosDaValidade(LocalDate inicio, LocalDate fim) {
        return jpaRepository.countProdutosProximosDaValidade(inicio, fim);
    }

    @Override
    public List<Produto> findProdutosProximosLimiteUso() {
        return jpaRepository.findProdutosProximosLimiteUso().stream()
                .map(ProdutoMapper::toDomain)
                .toList();
    }

    @Override
    public Long countProdutosProximosLimiteUso() {
        return jpaRepository.countProdutosProximosLimiteUso();
    }
}
