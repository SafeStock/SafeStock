package com.example.safestock.application.port.in;

import com.example.safestock.domain.model.PagedResult;
import com.example.safestock.domain.model.Produto;
import java.util.List;
import java.util.Optional;

public interface ProdutoUseCase {

    Produto cadastrarProduto(Produto produto);
    List<Produto> listarTodos();
    Optional<Produto> buscarProdutoPorId(Long id);
    Optional<Produto> atualizarProduto(Long id, Produto produto);
    void deletarProduto(Long id);

    // KPIs
    Long contarProdutosCadastrados();
    Long contarProdutosProximosDaValidade();
    Long contarProdutosProximosLimiteUso();
    Long contarProdutosRetiradosDoEstoqueMesAtual();
    List<Produto> listarProdutosProximosDaValidade();
    List<Produto> listarProdutosProximosLimiteUso();
    
    // Paginação
    PagedResult<Produto> listarPaginado(int page, int size);
}
