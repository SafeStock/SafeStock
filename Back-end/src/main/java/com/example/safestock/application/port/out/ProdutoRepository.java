package com.example.safestock.application.port.out;

import com.example.safestock.domain.model.Produto;

public interface ProdutoRepository {

    Produto save(Produto produto);
}
