package com.example.safestock.controller;

import com.example.safestock.dto.produto.*;
import com.example.safestock.model.Produto;
import com.example.safestock.service.ProdutoService;
import com.example.safestock.service.RegistroUsoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private RegistroUsoService registroUsoService;

    @PostMapping("/cadastro")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Void> cadastrarProduto(@RequestBody @Valid ProdutoCadastro produtoCadastro){
        final Produto novoProduto = ProdutoMapper.of(produtoCadastro);
        this.produtoService.cadastrarProduto(novoProduto);
        return ResponseEntity.status(201).build();
    }

    @GetMapping
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<List<ProdutoListar>> listarProdutos(){
        List<ProdutoListar> produtosEncontrados = this.produtoService.listarTodos();
        if (produtosEncontrados.isEmpty()){
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(produtosEncontrados);
    }

    @GetMapping("/kpi/totalprodutos")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Long> obterTotalProdutosCadastrados() {
        Long total = produtoService.contarProdutosCadastrados();
        return ResponseEntity.ok(total);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProdutoPorId(@PathVariable Long id){
        Optional<Produto> produto = produtoService.buscarProdutoPorId(id);
        return produto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/atualizar/{id}")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody ProdutoAtualizar produtoAtualizar) {

        Produto produto = ProdutoMapper.of(id, produtoAtualizar);

        return produtoService.atualizarProduto(id, produto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deletar/{id}")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<ProdutoRemover> deletarProdutos(@PathVariable Long id) {
        if (produtoService.buscarProdutoPorId(id).isPresent()) {
            produtoService.deletarProdutos(id);
            ProdutoRemover removido = ProdutoMapper.of(id);
            return ResponseEntity.ok(removido);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/kpi/proximosvalidade")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<List<ProdutoListar>> listarProdutosProximosDaValidade() {
        List<ProdutoListar> produtosProximos = produtoService.listarProdutosProximosDaValidade();
        if (produtosProximos.isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(produtosProximos);
    }

    @GetMapping("/kpi/totalproximosvalidade")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Long> obterTotalProdutosProximosDaValidade() {
        Long total = produtoService.contarProdutosProximosDaValidade();
        return ResponseEntity.ok(total);
    }

    // Adicione estes endpoints no ProdutoController.java
    @GetMapping("/kpi/proximoslimite")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<List<ProdutoListar>> listarProdutosProximosLimiteUso() {
        List<ProdutoListar> produtos = produtoService.listarProdutosProximosLimiteUso();
        return produtos.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(produtos);
    }

    @GetMapping("/kpi/totalproximoslimite")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Long> contarProdutosProximosLimiteUso() {
        return ResponseEntity.ok(produtoService.contarProdutosProximosLimiteUso());
    }

    @GetMapping("/kpi/totalretiradoestoque")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Long> contarProdutosSaidaEstoque() {
        return ResponseEntity.ok(registroUsoService.contarPordutosRetiradosDoEstoque());
    }
}
