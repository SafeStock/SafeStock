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
        List<Produto> all = new java.util.ArrayList<>(produtoRepository.findAll());
        
        // Ordena por nome A-Z
        all.sort((p1, p2) -> p1.getNome().compareToIgnoreCase(p2.getNome()));
        
        int start = page * size;
        int end = Math.min(start + size, all.size());
        if (start >= all.size()) {
            return new PagedResult<>(List.of(), page, size, all.size());
        }
        List<Produto> pageContent = all.subList(start, end);
        return new PagedResult<>(pageContent, page, size, all.size());
    }

    // Métodos legados para compatibilidade
    public void salvarProduto(Produto produto) {
        produtoRepository.save(produto);
    }

    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    @Transactional
    public void deletarPorId(Long id) {
        produtoRepository.deleteById(id);
    }

    public long contarProdutos() {
        return produtoRepository.count();
    }

    // ---- MÉTODOS DE KPI (ProdutoUseCase) ----

    @Override
    public List<Produto> listarProdutosProximosDaValidade() {
        LocalDate hoje = LocalDate.now();
        LocalDate quarentaCincoDias = hoje.plusDays(45);
        return produtoRepository.findProdutosProximosDaValidade(hoje, quarentaCincoDias);
    }

    @Override
    public Long contarProdutosProximosDaValidade() {
        LocalDate hoje = LocalDate.now();
        LocalDate quarentaCincoDias = hoje.plusDays(45);
        return produtoRepository.countProdutosProximosDaValidade(hoje, quarentaCincoDias);
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
    
    // Método para exportação de relatórios
    public List<java.util.Map<String, Object>> buscarProdutosComoMapa(String month) {
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM");

        if (month != null) {
            try {
                formatter.parse(month); // Valida o formato do mês
            } catch (Exception e) {
                throw new IllegalArgumentException("Formato de mês inválido. Use o formato yyyy-MM.");
            }
        }

        List<Produto> produtos = produtoRepository.findAll();

        if (produtos.isEmpty()) {
            throw new IllegalStateException("Nenhum produto encontrado no banco de dados.");
        }

        return produtos.stream()
            .filter(produto -> {
                if (month == null || produto.getDataEntrada() == null) return true;
                String dataEntrada = produto.getDataEntrada().toLocalDate().format(formatter);
                return dataEntrada.equals(month);
            })
            .map(produto -> {
                java.util.Map<String, Object> map = new java.util.HashMap<>();
                map.put("Id", produto.getId());
                map.put("Nome", produto.getNome());
                map.put("Categoria", produto.getCategoriaProduto());
                map.put("Quantidade", produto.getQuantidade());
                map.put("Data de Validade", produto.getDataValidade());
                map.put("Limite de Uso", produto.getLimiteSemanalDeUso());
                map.put("Data de Entrada", produto.getDataEntrada());
                return map;
            })
            .toList();
    }
}
