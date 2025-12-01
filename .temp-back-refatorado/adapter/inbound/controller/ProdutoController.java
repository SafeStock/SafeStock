package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.PagedResponse;
import com.example.safestock.application.port.in.ProdutoUseCase;
import com.example.safestock.domain.model.PagedResult;
import com.example.safestock.domain.model.Produto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@SecurityRequirement(name = "Bearer")
public class ProdutoController {

    private final ProdutoUseCase useCase;

    public ProdutoController(ProdutoUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
        Produto saved = useCase.cadastrarProduto(produto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        return ResponseEntity.ok(useCase.listarTodos());
    }

    @GetMapping("/paged")
    public ResponseEntity<PagedResponse<Produto>> listarPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        PagedResult<Produto> result = useCase.listarPaginado(page, size);
        if (result.getContent().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(PagedResponse.from(result));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return useCase.buscarProdutoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        return useCase.atualizarProduto(id, produtoAtualizado)
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

    @GetMapping("/count")
    public ResponseEntity<Long> contarProdutos() {
        return ResponseEntity.ok(useCase.contarProdutos());
    }

    // -------------------------------
    // ENDPOINTS DE KPI
    // -------------------------------

    @GetMapping("/kpi/proximosvalidade")
    public ResponseEntity<List<Produto>> listarProdutosProximosDaValidade() {
        return ResponseEntity.ok(useCase.listarProdutosProximosDaValidade());
    }

    @GetMapping("/kpi/totalproximosvalidade")
    public ResponseEntity<Long> contarProdutosProximosDaValidade() {
        return ResponseEntity.ok(useCase.contarProdutosProximosDaValidade());
    }

    @GetMapping("/kpi/proximoslimite")
    public ResponseEntity<List<Produto>> listarProdutosProximosLimiteUso() {
        return ResponseEntity.ok(useCase.listarProdutosProximosLimiteUso());
    }

    @GetMapping("/kpi/totalproximoslimite")
    public ResponseEntity<Long> contarProdutosProximosLimiteUso() {
        return ResponseEntity.ok(useCase.contarProdutosProximosLimiteUso());
    }

    @GetMapping("/kpi/totalprodutos")
    public ResponseEntity<Long> contarProdutosCadastrados() {
        return ResponseEntity.ok(useCase.contarProdutosCadastrados());
    }

    @GetMapping("/kpi/totalretiradoestoque")
    public ResponseEntity<Long> contarProdutosRetiradosDoEstoque() {
        return ResponseEntity.ok(useCase.contarProdutosRetiradosDoEstoqueMesAtual());
    }
}
