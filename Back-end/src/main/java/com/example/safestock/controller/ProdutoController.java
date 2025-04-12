package com.example.safestock.controller;

import com.example.safestock.model.Funcionario;
import com.example.safestock.model.Produto;
import com.example.safestock.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public  ResponseEntity<Produto> cadastrarProduto(@Valid @RequestBody Produto produto){
        Produto novoProduto = produtoService.cadastrarProduto(produto);
        return ResponseEntity.ok(novoProduto);
    }

    @GetMapping
    public List<Produto> listarProdutos(){
        return produtoService.listarProdutos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProdutoPorId(@PathVariable Long id){
        Optional<Produto> produto = produtoService.buscarProdutoPorId(id);
        return produto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
