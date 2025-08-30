package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.ProdutoRequest;
import com.example.safestock.adapter.inbound.dto.ProdutoResponse;
import com.example.safestock.application.port.in.ProdutoUseCase;
import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.Produto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos_v2")
public class ProdutoController {

    private final ProdutoUseCase useCase;

    public ProdutoController(ProdutoUseCase useCase) { this.useCase = useCase; }

    @PostMapping
    public ResponseEntity<ProdutoResponse> create(@RequestBody @Valid ProdutoRequest req) {
        Produto d = new Produto();
        d.setNome(req.getNome());
        d.setCategoriaProduto(req.getCategoriaProduto());
        d.setQuantidade(req.getQuantidade());
        d.setLimiteSemanalDeUso(req.getLimiteSemanalDeUso());
        d.setDataValidade(req.getDataValidade());
        d.setDataEntrada(req.getDataEntrada());
        if (req.getCrecheId() != null) { Creche c = new Creche(); c.setId(req.getCrecheId()); d.setCreche(c); }

        Produto saved = useCase.criar(d);
        ProdutoResponse r = new ProdutoResponse();
        r.setId(saved.getId()); r.setNome(saved.getNome()); r.setQuantidade(saved.getQuantidade()); r.setLimiteSemanalDeUso(saved.getLimiteSemanalDeUso()); r.setDataValidade(saved.getDataValidade()); r.setDataEntrada(saved.getDataEntrada());
        if (saved.getCreche() != null) r.setCrecheId(saved.getCreche().getId());

        return ResponseEntity.created(URI.create("/api/produtos_v2/" + r.getId())).body(r);
    }
}
