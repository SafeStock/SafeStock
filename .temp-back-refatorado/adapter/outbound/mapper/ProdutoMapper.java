package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.adapter.inbound.dto.ProdutoResponse;
import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.infrastructure.entity.CrecheEntity;
import com.example.safestock.infrastructure.entity.ProdutoEntity;

import java.util.List;
import java.util.stream.Collectors;

public class ProdutoMapper {

    // -------------------------
    // Domain ↔ Entity
    // -------------------------
    public static Produto toDomain(ProdutoEntity entity) {
        if (entity == null) return null;

        Produto produto = new Produto();
        produto.setId(entity.getId());
        produto.setNome(entity.getNome());
        produto.setQuantidade(entity.getQuantidade());
        produto.setLimiteSemanalDeUso(entity.getLimiteSemanalDeUso());
        produto.setDataValidade(entity.getDataValidade());
        produto.setDataEntrada(entity.getDataEntrada());
        produto.setCategoriaProduto(entity.getCategoriaProduto());
        produto.setCreche(); // supondo que seja um objeto do tipo Creche
        return produto;
    }

    public static ProdutoEntity toEntity(Produto produto) {
        if (produto == null) return null;

        ProdutoEntity entity = new ProdutoEntity();
        entity.setId(produto.getId());
        entity.setNome(produto.getNome());
        entity.setQuantidade(produto.getQuantidade());
        entity.setLimiteSemanalDeUso(produto.getLimiteSemanalDeUso());
        entity.setDataValidade(produto.getDataValidade());
        entity.setDataEntrada(produto.getDataEntrada());
        entity.setCategoriaProduto(produto.getCategoriaProduto());
        entity.setCreche();
        return entity;
    }

    // -------------------------
    // Domain → DTO
    // -------------------------
    public static ProdutoResponse toResponse(Produto produto) {
        if (produto == null) return null;

        Long crecheId = (produto.getCreche() != null) ? produto.getCreche().getId() : null;

        return new ProdutoResponse(
                produto.getId(),
                produto.getNome(),
                produto.getQuantidade(),
                produto.getLimiteSemanalDeUso(),
                produto.getDataValidade(),
                produto.getDataEntrada(),
                crecheId
        );
    }

    public static List<ProdutoResponse> toResponseList(List<Produto> produtos) {
        if (produtos == null) return List.of();

        return produtos.stream()
                .map(ProdutoMapper::toResponse)
                .collect(Collectors.toList());
    }
}
