package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.RegistroUsoRequest;
import com.example.safestock.adapter.inbound.dto.RegistroUsoResponse;
import com.example.safestock.application.port.in.RegistroUsoUseCase;
import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.domain.model.RegistroUso;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/registroUso")
public class RegistroUsoController {

    private final RegistroUsoUseCase useCase;

    public RegistroUsoController(RegistroUsoUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<RegistroUsoResponse> create(@RequestBody @Valid RegistroUsoRequest req) {

        RegistroUso d = new RegistroUso();
        d.setProduto(req.getProduto());
        d.setDataValidade(req.getDataValidade());
        d.setQuantidade(req.getQuantidade());
        d.setDataHoraSaida(req.getDataHoraSaida());

        Funcionario f = new Funcionario();
        f.setId(req.getFuncionarioId());
        d.setFuncionario(f);

        RegistroUso saved = useCase.criar(d);

        RegistroUsoResponse resp = new RegistroUsoResponse();
        resp.setId(saved.getId());
        resp.setProduto(saved.getProduto());
        resp.setDataValidade(saved.getDataValidade());
        resp.setQuantidade(saved.getQuantidade());
        resp.setDataHoraSaida(saved.getDataHoraSaida());
        resp.setFuncionarioId(saved.getFuncionario() != null ? saved.getFuncionario().getId() : null);

        return ResponseEntity.created(URI.create("/api/registroUso" + resp.getId())).body(resp);
    }

    @GetMapping
    public ResponseEntity<List<RegistroUso>> list() {
        return ResponseEntity.ok(useCase.listar());
    }

    @GetMapping("/paged")
    public ResponseEntity<com.example.safestock.adapter.inbound.dto.PagedResponse<RegistroUso>> listarPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        com.example.safestock.domain.model.PagedResult<RegistroUso> result = useCase.listarPaginado(page, size);
        
        if (result.getContent().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(com.example.safestock.adapter.inbound.dto.PagedResponse.from(result));
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        useCase.deletar(id);
        return ResponseEntity.noContent().build();
    }
}