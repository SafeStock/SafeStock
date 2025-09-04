package com.example.safestock.service;

import com.example.safestock.dto.produto.ProdutoListar;
import com.example.safestock.dto.produto.ProdutoMapper;
import com.example.safestock.model.Produto;
import com.example.safestock.repository.HistoricoAlertasRepository;
import com.example.safestock.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    public final ProdutoRepository produtoRepository;

    public final HistoricoAlertasRepository historicoAlertasRepository;

    public ProdutoService(ProdutoRepository produtoRepository,
                          HistoricoAlertasRepository historicoAlertasRepository) {
        this.produtoRepository = produtoRepository;
        this.historicoAlertasRepository = historicoAlertasRepository;
    }

    public Long contarProdutosCadastrados() {
        return produtoRepository.count();
    }

    public void cadastrarProduto(Produto novoProduto){
        this.produtoRepository.save(novoProduto);
    }

    public List<ProdutoListar> listarTodos(){
        List<Produto> produtoEncontrado = produtoRepository.findAll();
        System.out.println("Produtos encontrados: " + produtoEncontrado.size());
        produtoEncontrado.forEach(produto -> System.out.println(produto.getNome()));

        return produtoEncontrado.stream()
                .map(ProdutoMapper::of)
                .toList();
    }


    public Optional<Produto> buscarProdutoPorId(Long id ){
        return produtoRepository.findById(id);
    }

    public Optional<Produto> atualizarProduto(Long id, Produto novoProduto) {
        return produtoRepository.findById(id).map(produto -> {
            produto.setNome(novoProduto.getNome());
            produto.setCategoriaProduto(novoProduto.getCategoriaProduto());
            produto.setQuantidade(novoProduto.getQuantidade());
            produto.setLimiteSemanalDeUso(novoProduto.getLimiteSemanalDeUso());
            produto.setDataValidade(novoProduto.getDataValidade());
            produto.setDataEntrada(novoProduto.getDataEntrada());
            return produtoRepository.save(produto);
        });
    }

    @Transactional

    public void deletarProdutos(Long produtoId) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // Deleta os históricos relacionados antes do produto
        historicoAlertasRepository.deleteByProduto(produto);

        // Agora pode deletar o produto
        produtoRepository.deleteById(produtoId);
    }

    public List<ProdutoListar> listarProdutosProximosDaValidade() {
        LocalDate hoje = LocalDate.now();
        LocalDate dataLimite = hoje.plusDays(31);

        List<Produto> produtosProximos = produtoRepository.findByDataValidadeBetween(hoje, dataLimite);

        return produtosProximos.stream()
                .map(ProdutoMapper::of)
                .toList();
    }


    public Long contarProdutosProximosDaValidade() {
        LocalDate hoje = LocalDate.now();
        LocalDate dataLimite = hoje.plusDays(31);

        return produtoRepository.countByDataValidadeBetween(hoje, dataLimite);
    }


    public Long contarProdutosProximosLimiteUso() {
        return produtoRepository.countProdutosProximosLimiteUso();
    }

    public List<ProdutoListar> listarProdutosProximosLimiteUso() {
        return produtoRepository.findProdutosProximosLimiteUso()
                .stream()
                .map(ProdutoMapper::of)
                .toList();
    }

}
