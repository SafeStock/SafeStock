package com.example.safestock.application.service;

import com.example.safestock.application.port.in.ProdutoUseCase;
import com.example.safestock.application.port.out.ProdutoRepository;
import com.example.safestock.domain.model.PagedResult;
import com.example.safestock.domain.model.Produto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService implements ProdutoUseCase {

    private final ProdutoRepository produtoRepository;
    private final RegistroUsoService registroUsoService;

    public ProdutoService(ProdutoRepository produtoRepository, RegistroUsoService registroUsoService) {
        this.produtoRepository = produtoRepository;
        this.registroUsoService = registroUsoService;
    }

    @Override
    public Produto cadastrarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Override
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    @Override
    public Optional<Produto> buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    @Override
    public Optional<Produto> atualizarProduto(Long id, Produto produto) {
        return produtoRepository.findById(id).map(existente -> {
            produto.setId(id);
            return produtoRepository.save(produto);
        });
    }

    @Override
    @Transactional
    public void deletarProduto(Long id) {
        produtoRepository.deleteById(id);
    }

    @Override
    public PagedResult<Produto> listarPaginado(int page, int size) {
        List<Produto> all = produtoRepository.findAll();
        int start = page * size;
        int end = Math.min(start + size, all.size());
        if (start >= all.size()) {
            return new PagedResult<>(List.of(), page, size, all.size());
        }
        List<Produto> pageContent = all.subList(start, end);
        return new PagedResult<>(pageContent, page, size, all.size());
    }

    // Métodos legados para compatibilidade
    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    @Transactional
    public void deletarPorId(Long id) {
        produtoRepository.deleteById(id);
    }

    @Override
    public Long contarProdutos() {
        return produtoRepository.count();
    }

    // ---- MÉTODOS DE KPI (ProdutoUseCase) ----

    @Override
    public List<Produto> listarProdutosProximosDaValidade() {
        LocalDate hoje = LocalDate.now();
        LocalDate seteDias = hoje.plusDays(7);
        return produtoRepository.findProdutosProximosDaValidade(hoje, seteDias);
    }

    @Override
    public Long contarProdutosProximosDaValidade() {
        LocalDate hoje = LocalDate.now();
        LocalDate seteDias = hoje.plusDays(7);
        return produtoRepository.countProdutosProximosDaValidade(hoje, seteDias);
    }

    @Override
    public List<Produto> listarProdutosProximosLimiteUso() {
        return produtoRepository.findProdutosProximosLimiteUso();
    }

    @Override
    public Long contarProdutosProximosLimiteUso() {
        return produtoRepository.countProdutosProximosLimiteUso();
    }

    @Override
    public Long contarProdutosCadastrados() {
        return produtoRepository.count();
    }

    @Override
    public Long contarProdutosRetiradosDoEstoqueMesAtual() {
        return registroUsoService.contarProdutosRetiradosDoEstoqueMesAtual();
    }
}
