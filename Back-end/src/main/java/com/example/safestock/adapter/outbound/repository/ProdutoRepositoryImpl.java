package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.adapter.outbound.mapper.ProdutoMapper;
import com.example.safestock.application.port.out.ProdutoRepository;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.infrastructure.entity.ProdutoEntity;
import com.example.safestock.infrastructure.jpa.JpaProdutoRepository;
import org.springframework.stereotype.Repository;

@Repository("produtoRepositoryImpl")
public class ProdutoRepositoryImpl implements ProdutoRepository {

    private final JpaProdutoRepository jpa;

    public ProdutoRepositoryImpl(JpaProdutoRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Produto save(Produto produto) {
        ProdutoEntity entity = ProdutoMapper.toEntity(produto);
        ProdutoEntity saved = jpa.save(entity);
        return ProdutoMapper.toDomain(saved);
    }
}
