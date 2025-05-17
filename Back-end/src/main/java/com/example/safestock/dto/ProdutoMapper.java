package com.example.safestock.dto;

import com.example.safestock.model.Funcionario;
import com.example.safestock.model.Produto;

public class ProdutoMapper {

    public static Produto fromCadastroDTO(ProdutoDTO dto) {
        Produto produto = new Produto();

        produto.setNome(dto.getNome());
        produto.setCategoriaProduto(dto.getCategoriaProduto());
        produto.setQuantidade(dto.getQuantidade());
        produto.setLimiteSemanalDeUso(dto.getLimiteSemanalDeUso());
        produto.setDataValidade(dto.getDataValidade());
        produto.setDataEntrada(dto.getDataEntrada());
        produto.setCreche(dto.getCreche());

        return produto;
    }

    public static Produto fromAtualizacaoDTO(Long id, ProdutoDTO dto) {
        Produto produto = new Produto();

        produto.setId(id);
        produto.setNome(dto.getNome());
        produto.setCategoriaProduto(dto.getCategoriaProduto());
        produto.setQuantidade(dto.getQuantidade());
        produto.setLimiteSemanalDeUso(dto.getLimiteSemanalDeUso());
        produto.setDataValidade(dto.getDataValidade());
        produto.setDataEntrada(dto.getDataEntrada());
        produto.setCreche(dto.getCreche());

        return produto;
    }

    public static ProdutoDTO fromListarDTO(Produto produto) {
        ProdutoDTO dto = new ProdutoDTO();

        dto.setId(produto.getId());
        dto.setNome(produto.getNome());
        dto.setCategoriaProduto(produto.getCategoriaProduto());
        dto.setQuantidade(produto.getQuantidade());
        dto.setLimiteSemanalDeUso(produto.getLimiteSemanalDeUso());
        dto.setDataValidade(produto.getDataValidade());
        dto.setDataEntrada(produto.getDataEntrada());
        dto.setCreche(produto.getCreche());

        return dto;
    }

    public static ProdutoDTO fromDeletarDTO(Long id) {
        ProdutoDTO remover = new ProdutoDTO();
        remover.setId(id);
        return remover;
    }
}
