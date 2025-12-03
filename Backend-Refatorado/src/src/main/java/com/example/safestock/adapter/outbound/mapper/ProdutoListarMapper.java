package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.adapter.inbound.dto.ProdutoListar;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.infrastructure.entity.ProdutoEntity;

import java.time.LocalDateTime;

public class ProdutoListarMapper {

    public static ProdutoListar toDTO(Produto produto) {
        if (produto == null) return null;
        
        return new ProdutoListar(
            produto.getId(),
            produto.getNome(),
            produto.getCategoriaProduto(),
            produto.getQuantidade(),
            produto.getLimiteSemanalDeUso(),
            produto.getDataValidade(),
            produto.getDataEntrada() != null ? produto.getDataEntrada() : LocalDateTime.now(),
            produto.getCreche() != null ? produto.getCreche().getId() : null
        );
    }

    public static ProdutoListar fromEntity(ProdutoEntity entity) {
        if (entity == null) return null;
        
        return new ProdutoListar(
            entity.getId(),
            entity.getNome(),
            entity.getCategoriaProduto(),
            entity.getQuantidade(),
            entity.getLimiteSemanalDeUso(),
            entity.getDataValidade(),
            entity.getDataEntrada(),
            entity.getCreche() != null ? entity.getCreche().getId() : null
        );
    }
}
