package com.example.safestock.application.service;

import com.example.safestock.application.port.in.ProdutoUseCase;
import com.example.safestock.application.port.out.ProdutoRepository;
import com.example.safestock.domain.model.Produto;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("produtoServiceV2")
public class ProdutoService implements ProdutoUseCase {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(@Qualifier("produtoRepositoryImpl") ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @Override
    public Produto criar(Produto produto) {
        // Regras de negócio aqui (ex: validações)
        return produtoRepository.save(produto);
    }
}
