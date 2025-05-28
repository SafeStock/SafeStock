package com.example.safestock.service;

import com.example.safestock.dto.produto.ProdutoListar;
import com.example.safestock.dto.produto.ProdutoMapper;
import com.example.safestock.model.Produto;
import com.example.safestock.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    public final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
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

    public void deletarProdutos(Long id) {
        produtoRepository.deleteById(id);
    }

}
