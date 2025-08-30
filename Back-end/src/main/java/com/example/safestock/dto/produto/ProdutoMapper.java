package com.example.safestock.dto.produto;

import com.example.safestock.model.Produto;

public class ProdutoMapper {

    public static Produto of(ProdutoCadastro produtoCadastro) {
        Produto produto = new Produto();
        produto.setNome(produtoCadastro.getNome());
        produto.setCategoriaProduto(produtoCadastro.getCategoriaProduto());
        produto.setQuantidade(produtoCadastro.getQuantidade());
        produto.setLimiteSemanalDeUso(produtoCadastro.getLimiteSemanalDeUso());
        produto.setDataValidade(produtoCadastro.getDataValidade());
        produto.setDataEntrada(produtoCadastro.getDataEntrada());
        return produto;
    }

    public static Produto of(Long id, ProdutoAtualizar produtoAtualizar) {
        Produto produto = new Produto();

        produto.setId(id);
        produto.setNome(produtoAtualizar.getNome());
        produto.setCategoriaProduto(produtoAtualizar.getCategoriaProduto());
        produto.setQuantidade(produtoAtualizar.getQuantidade());
        produto.setLimiteSemanalDeUso(produtoAtualizar.getLimiteSemanalDeUso());
        produto.setDataValidade(produtoAtualizar.getDataValidade());
        produto.setDataEntrada(produtoAtualizar.getDataEntrada());

        return produto;
    }

    public static ProdutoListar of(Produto produto) {
        ProdutoListar produtoListar = new ProdutoListar();

        produtoListar.setId(produto.getId());
        produtoListar.setNome(produto.getNome());
        produtoListar.setCategoriaProduto(produto.getCategoriaProduto());
        produtoListar.setQuantidade(produto.getQuantidade());
        produtoListar.setLimiteSemanalDeUso(produto.getLimiteSemanalDeUso());
        produtoListar.setDataValidade(produto.getDataValidade());
        produtoListar.setDataEntrada(produto.getDataEntrada());
        produtoListar.setCreche(produto.getCreche());

        return produtoListar;
    }

    public static ProdutoRemover of(Long id) {
        ProdutoRemover remover = new ProdutoRemover();
        remover.setId(id);
        return remover;
    }
}
