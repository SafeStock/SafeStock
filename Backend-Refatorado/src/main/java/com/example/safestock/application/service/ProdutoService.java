package com.example.safestock.application.service;

import com.example.safestock.application.port.in.ProdutoUseCase;
import com.example.safestock.application.port.out.ProdutoRepository;
import com.example.safestock.domain.model.PagedResult;
import com.example.safestock.domain.model.Produto;
import jakarta.transaction.Transactional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService implements ProdutoUseCase {

    // ---------------------------------------------
    // NOMES DOS CACHES
    // ---------------------------------------------
    private static final String PRODUTOS = "produtos";
    private static final String PRODUTO_POR_ID = "produtoPorId";
    private static final String PRODUTOS_PROX_VALIDADE = "produtosProximosValidade";
    private static final String PRODUTOS_PROX_LIMITE = "produtosProximosLimiteUso";
    private static final String KPI_TOTAL_PRODUTOS = "kpiTotalProdutos";
    private static final String KPI_PROX_VALIDADE = "kpiProdutosProximosValidade";
    private static final String KPI_PROX_LIMITE = "kpiProdutosProximosLimiteUso";
    private static final String KPI_RETIRADOS_MES = "kpiProdutosRetiradosEstoqueMesAtual";

    private final ProdutoRepository produtoRepository;
    private final RegistroUsoService registroUsoService;

    public ProdutoService(ProdutoRepository produtoRepository, RegistroUsoService registroUsoService) {
        this.produtoRepository = produtoRepository;
        this.registroUsoService = registroUsoService;
    }

    // -------------------------------------------------------
    // CADASTRAR PRODUTO
    // -------------------------------------------------------
    @Override
    @CachePut(value = PRODUTO_POR_ID, key = "#result.id")
    @CacheEvict(
            value = {
                    PRODUTOS,
                    PRODUTOS_PROX_VALIDADE,
                    PRODUTOS_PROX_LIMITE,
                    KPI_TOTAL_PRODUTOS,
                    KPI_PROX_VALIDADE,
                    KPI_PROX_LIMITE,
                    KPI_RETIRADOS_MES
            },
            allEntries = true
    )
    public Produto cadastrarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    // -------------------------------------------------------
    // LISTAR TODOS
    // -------------------------------------------------------
    @Override
    @Cacheable(value = PRODUTOS)
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    // -------------------------------------------------------
    // BUSCAR POR ID
    // -------------------------------------------------------
    @Override
    @Cacheable(value = PRODUTO_POR_ID, key = "#id")
    public Optional<Produto> buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    // -------------------------------------------------------
    // ATUALIZAR PRODUTO
    // -------------------------------------------------------
    @Override
    @CacheEvict(
            value = {
                    PRODUTOS,
                    PRODUTO_POR_ID,
                    PRODUTOS_PROX_VALIDADE,
                    PRODUTOS_PROX_LIMITE,
                    KPI_TOTAL_PRODUTOS,
                    KPI_PROX_VALIDADE,
                    KPI_PROX_LIMITE,
                    KPI_RETIRADOS_MES
            },
            allEntries = true
    )
    public Optional<Produto> atualizarProduto(Long id, Produto produto) {
        return produtoRepository.findById(id).map(existente -> {
            produto.setId(id);
            return produtoRepository.save(produto);
        });
    }

    // -------------------------------------------------------
    // DELETAR PRODUTO
    // -------------------------------------------------------
    @Override
    @Transactional
    @CacheEvict(
            value = {
                    PRODUTOS,
                    PRODUTO_POR_ID,
                    PRODUTOS_PROX_VALIDADE,
                    PRODUTOS_PROX_LIMITE,
                    KPI_TOTAL_PRODUTOS,
                    KPI_PROX_VALIDADE,
                    KPI_PROX_LIMITE,
                    KPI_RETIRADOS_MES
            },
            allEntries = true
    )
    public void deletarProduto(Long id) {
        produtoRepository.deleteById(id);
    }

    // -------------------------------------------------------
    // LISTAGEM PAGINADA
    // (não apliquei cache por causa de page+size variáveis)
    // -------------------------------------------------------
    @Override
    public PagedResult<Produto> listarPaginado(int page, int size) {
        List<Produto> all = new java.util.ArrayList<>(produtoRepository.findAll());

        all.sort((p1, p2) -> p1.getNome().compareToIgnoreCase(p2.getNome()));

        int start = page * size;
        int end = Math.min(start + size, all.size());

        if (start >= all.size()) {
            return new PagedResult<>(List.of(), page, size, all.size());
        }

        List<Produto> pageContent = all.subList(start, end);

        return new PagedResult<>(pageContent, page, size, all.size());
    }

    // -------------------------------------------------------
    // MÉTODOS LEGADOS
    // -------------------------------------------------------

    @CachePut(value = PRODUTO_POR_ID, key = "#produto.id")
    @CacheEvict(
            value = {
                    PRODUTOS,
                    PRODUTOS_PROX_VALIDADE,
                    PRODUTOS_PROX_LIMITE,
                    KPI_TOTAL_PRODUTOS,
                    KPI_PROX_VALIDADE,
                    KPI_PROX_LIMITE,
                    KPI_RETIRADOS_MES
            },
            allEntries = true
    )
    public void salvarProduto(Produto produto) {
        produtoRepository.save(produto);
    }

    @Cacheable(value = PRODUTO_POR_ID, key = "#id")
    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    @Transactional
    @CacheEvict(
            value = {
                    PRODUTOS,
                    PRODUTO_POR_ID,
                    PRODUTOS_PROX_VALIDADE,
                    PRODUTOS_PROX_LIMITE,
                    KPI_TOTAL_PRODUTOS,
                    KPI_PROX_VALIDADE,
                    KPI_PROX_LIMITE,
                    KPI_RETIRADOS_MES
            },
            allEntries = true
    )
    public void deletarPorId(Long id) {
        produtoRepository.deleteById(id);
    }

    @Cacheable(value = KPI_TOTAL_PRODUTOS)
    public long contarProdutos() {
        return produtoRepository.count();
    }

    // -------------------------------------------------------
    // KPIs
    // -------------------------------------------------------

    @Override
    @Cacheable(value = PRODUTOS_PROX_VALIDADE)
    public List<Produto> listarProdutosProximosDaValidade() {
        LocalDate hoje = LocalDate.now();
        LocalDate quarentaCincoDias = hoje.plusDays(45);
        return produtoRepository.findProdutosProximosDaValidade(hoje, quarentaCincoDias);
    }

    @Override
    @Cacheable(value = KPI_PROX_VALIDADE)
    public Long contarProdutosProximosDaValidade() {
        LocalDate hoje = LocalDate.now();
        LocalDate quarentaCincoDias = hoje.plusDays(45);
        return produtoRepository.countProdutosProximosDaValidade(hoje, quarentaCincoDias);
    }

    @Override
    @Cacheable(value = PRODUTOS_PROX_LIMITE)
    public List<Produto> listarProdutosProximosLimiteUso() {
        return produtoRepository.findProdutosProximosLimiteUso();
    }

    @Override
    @Cacheable(value = KPI_PROX_LIMITE)
    public Long contarProdutosProximosLimiteUso() {
        return produtoRepository.countProdutosProximosLimiteUso();
    }

    @Override
    @Cacheable(value = KPI_TOTAL_PRODUTOS)
    public Long contarProdutosCadastrados() {
        return produtoRepository.count();
    }

    @Override
    @Cacheable(value = KPI_RETIRADOS_MES)
    public Long contarProdutosRetiradosDoEstoqueMesAtual() {
        return registroUsoService.contarProdutosRetiradosDoEstoqueMesAtual();
    }

    // -------------------------------------------------------
    // RELATÓRIOS (não cacheado por causa do filtro de mês)
    // -------------------------------------------------------
    public List<java.util.Map<String, Object>> buscarProdutosComoMapa(String month) {

        java.time.format.DateTimeFormatter formatter =
                java.time.format.DateTimeFormatter.ofPattern("yyyy-MM");

        if (month != null) {
            try {
                formatter.parse(month);
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
