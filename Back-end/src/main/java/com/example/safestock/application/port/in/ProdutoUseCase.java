package com.example.safestock.application.port.in;

import com.example.safestock.domain.model.Produto;

public interface ProdutoUseCase {

    Produto criar(Produto produto);
}
