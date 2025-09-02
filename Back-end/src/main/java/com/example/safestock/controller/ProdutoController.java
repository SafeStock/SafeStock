package com.example.safestock.controller;

import com.example.safestock.dto.produto.KpiQtd;
import com.example.safestock.dto.produto.*;
import com.example.safestock.model.Creche;
import com.example.safestock.model.Produto;
import com.example.safestock.service.CrecheService;
import com.example.safestock.service.ProdutoService;
import com.example.safestock.service.RegistroUsoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/produtos")
public class ProdutoController {

    @Autowired
    private CrecheService crecheService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private RegistroUsoService registroUsoService;

    // --- CRUD Produtos ---

    @PostMapping("/cadastro")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Void> cadastrarProduto(@RequestBody @Valid ProdutoCadastro produtoCadastro){
        Creche creche = crecheService.buscarPorId(produtoCadastro.getCrecheId());
        final Produto novoProduto = ProdutoMapper.of(produtoCadastro);
        novoProduto.setCreche(creche);
        this.produtoService.cadastrarProduto(novoProduto);
        return ResponseEntity.status(201).build();
    }

    @GetMapping
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<List<ProdutoListar>> listarProdutos(){
        List<ProdutoListar> produtosEncontrados = this.produtoService.listarTodos();
        if (produtosEncontrados == null) produtosEncontrados = new ArrayList<>();
        return ResponseEntity.ok(produtosEncontrados);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProdutoPorId(@PathVariable Long id){
        Optional<Produto> produto = produtoService.buscarProdutoPorId(id);
        return produto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
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

    // --- KPIs (sempre retornando JSON { "qtd": number }) ---

    @GetMapping("/kpi/totalprodutos")
    public ResponseEntity<KpiQtd> obterTotalProdutosCadastrados() {
        try {
            Long total = produtoService.contarProdutosCadastrados();
            if (total == null) total = 0L;
            return ResponseEntity.ok(new KpiQtd(total));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new KpiQtd(0L));
        }
    }

    @GetMapping("/kpi/totalproximosvalidade")
    public ResponseEntity<KpiQtd> obterTotalProdutosProximosDaValidade() {
        try {
            Long total = produtoService.contarProdutosProximosDaValidade();
            if (total == null) total = 0L;
            return ResponseEntity.ok(new KpiQtd(total));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new KpiQtd(0L));
        }
    }

    @GetMapping("/kpi/totalproximoslimite")
    public ResponseEntity<KpiQtd> contarProdutosProximosLimiteUso() {
        try {
            Long total = produtoService.contarProdutosProximosLimiteUso();
            if (total == null) total = 0L;
            return ResponseEntity.ok(new KpiQtd(total));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new KpiQtd(0L));
        }
    }

    @GetMapping("/kpi/totalretiradoestoque")
    public ResponseEntity<KpiQtd> contarProdutosSaidaEstoque() {
        try {
            Long total = registroUsoService.contarPordutosRetiradosDoEstoque();
            if (total == null) total = 0L;
            return ResponseEntity.ok(new KpiQtd(total));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new KpiQtd(0L));
        }
    }



    @GetMapping("/kpi/proximosvalidade")
    public ResponseEntity<List<ProdutoListar>> listarProdutosProximosDaValidade() {
        try {
            List<ProdutoListar> produtosProximos = produtoService.listarProdutosProximosDaValidade();
            if (produtosProximos == null) produtosProximos = new ArrayList<>();
            return ResponseEntity.ok(produtosProximos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ArrayList<>());
        }
    }

    @GetMapping("/kpi/proximoslimite")
    public ResponseEntity<List<ProdutoListar>> listarProdutosProximosLimiteUso() {
        try {
            List<ProdutoListar> produtos = produtoService.listarProdutosProximosLimiteUso();
            if (produtos == null) produtos = new ArrayList<>();
            return ResponseEntity.ok(produtos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ArrayList<>());
        }
    }

}
