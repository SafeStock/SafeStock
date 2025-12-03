package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.KpiQtd;
import com.example.safestock.adapter.inbound.dto.PagedResponse;
import com.example.safestock.adapter.inbound.dto.ProdutoAtualizar;
import com.example.safestock.adapter.inbound.dto.ProdutoCadastro;
import com.example.safestock.adapter.inbound.dto.ProdutoListar;
import com.example.safestock.adapter.outbound.mapper.ProdutoListarMapper;
import com.example.safestock.application.port.in.CrecheUseCase;
import com.example.safestock.application.port.in.ProdutoUseCase;
import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.PagedResult;
import com.example.safestock.domain.model.Produto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/produtos")
@SecurityRequirement(name = "Bearer")
public class ProdutoController {

    private final ProdutoUseCase useCase;
    private final CrecheUseCase crecheUseCase;

    public ProdutoController(ProdutoUseCase useCase, CrecheUseCase crecheUseCase) {
        this.useCase = useCase;
        this.crecheUseCase = crecheUseCase;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Void> cadastrarProduto(@RequestBody @Valid ProdutoCadastro produtoCadastro) {
        Creche creche = crecheUseCase.buscarPorId(produtoCadastro.getCrecheId())
                .orElseThrow(() -> new RuntimeException("Creche não encontrada"));
        
        Produto novoProduto = new Produto();
        novoProduto.setNome(produtoCadastro.getNome());
        novoProduto.setCategoriaProduto(produtoCadastro.getCategoriaProduto());
        novoProduto.setQuantidade(produtoCadastro.getQuantidade());
        novoProduto.setLimiteSemanalDeUso(produtoCadastro.getLimiteSemanalDeUso());
        novoProduto.setDataValidade(produtoCadastro.getDataValidade());
        novoProduto.setCreche(creche);
        
        useCase.cadastrarProduto(novoProduto);
        return ResponseEntity.status(201).build();
    }

    @GetMapping
    public ResponseEntity<List<ProdutoListar>> listarTodos() {
        List<Produto> produtos = useCase.listarTodos();
        List<ProdutoListar> produtosListar = produtos.stream()
                .map(ProdutoListarMapper::toDTO)
                .toList();
        
        return ResponseEntity.ok(produtosListar != null ? produtosListar : new ArrayList<>());
    }

    @GetMapping("/paged")
    public ResponseEntity<Map<String, Object>> listarPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        PagedResult<Produto> result = useCase.listarPaginado(page, size);
        
        if (result.getContent().isEmpty()) {
            return ResponseEntity.status(204).build();
        }
        
        List<ProdutoListar> content = result.getContent().stream()
                .map(ProdutoListarMapper::toDTO)
                .toList();
        
        Map<String, Object> body = new HashMap<>();
        body.put("content", content);
        body.put("page", result.getPage());
        body.put("size", result.getSize());
        body.put("totalPages", (int) Math.ceil((double) result.getTotalElements() / result.getSize()));
        body.put("totalElements", result.getTotalElements());
        
        return ResponseEntity.ok(body);
    }

    // Endpoint público para testes locais
    @GetMapping("/public/paged")
    public ResponseEntity<Map<String, Object>> listarPaginadoPublico(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return listarPaginado(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return useCase.buscarProdutoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody @Valid ProdutoAtualizar produtoAtualizar) {
        Produto produto = new Produto();
        produto.setNome(produtoAtualizar.getNome());
        produto.setCategoriaProduto(produtoAtualizar.getCategoriaProduto());
        produto.setQuantidade(produtoAtualizar.getQuantidade());
        produto.setLimiteSemanalDeUso(produtoAtualizar.getLimiteSemanalDeUso());
        produto.setDataValidade(produtoAtualizar.getDataValidade());
        
        return useCase.atualizarProduto(id, produto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
        if (useCase.buscarProdutoPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        useCase.deletarProduto(id);
        return ResponseEntity.noContent().build();
    }

    // -------------------------------
    // ENDPOINTS DE KPI (retornam KpiQtd)
    // -------------------------------

    @GetMapping("/kpi/totalprodutos")
    public ResponseEntity<KpiQtd> obterTotalProdutosCadastrados() {
        try {
            Long total = useCase.contarProdutosCadastrados();
            return ResponseEntity.ok(new KpiQtd(total != null ? total : 0L));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new KpiQtd(0L));
        }
    }

    @GetMapping("/kpi/totalproximosvalidade")
    public ResponseEntity<KpiQtd> obterTotalProdutosProximosDaValidade() {
        try {
            Long total = useCase.contarProdutosProximosDaValidade();
            return ResponseEntity.ok(new KpiQtd(total != null ? total : 0L));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new KpiQtd(0L));
        }
    }

    @GetMapping("/kpi/totalproximoslimite")
    public ResponseEntity<KpiQtd> contarProdutosProximosLimiteUso() {
        try {
            Long total = useCase.contarProdutosProximosLimiteUso();
            return ResponseEntity.ok(new KpiQtd(total != null ? total : 0L));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new KpiQtd(0L));
        }
    }

    @GetMapping("/kpi/totalretiradoestoque")
    public ResponseEntity<KpiQtd> contarProdutosSaidaEstoque() {
        try {
            Long total = useCase.contarProdutosRetiradosDoEstoqueMesAtual();
            return ResponseEntity.ok(new KpiQtd(total));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new KpiQtd(0L));
        }
    }

    @GetMapping("/kpi/proximosvalidade")
    public ResponseEntity<List<ProdutoListar>> listarProdutosProximosDaValidade() {
        try {
            List<Produto> produtos = useCase.listarProdutosProximosDaValidade();
            List<ProdutoListar> produtosListar = produtos.stream()
                    .map(ProdutoListarMapper::toDTO)
                    .toList();
            return ResponseEntity.ok(produtosListar != null ? produtosListar : new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ArrayList<>());
        }
    }

    @GetMapping("/kpi/proximoslimite")
    public ResponseEntity<List<ProdutoListar>> listarProdutosProximosLimiteUso() {
        try {
            List<Produto> produtos = useCase.listarProdutosProximosLimiteUso();
            List<ProdutoListar> produtosListar = produtos.stream()
                    .map(ProdutoListarMapper::toDTO)
                    .toList();
            return ResponseEntity.ok(produtosListar != null ? produtosListar : new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ArrayList<>());
        }
    }
}
