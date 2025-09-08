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

@RestController("registroUsoControllerV2")
@RequestMapping("/api/registro_uso_v2")
public class RegistroUsoController {

    private final RegistroUsoUseCase useCase;

    public RegistroUsoController(@Qualifier("registroUsoServiceV2") RegistroUsoUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping("/api/registro_uso_v2")
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

        return ResponseEntity.created(URI.create("/api/registro_uso_v2/" + resp.getId())).body(resp);
    }

    @GetMapping("/api/registro_uso_v2")
    public ResponseEntity<List<RegistroUso>> list() {
        return ResponseEntity.ok(useCase.listar());
    }

    @DeleteMapping("/api/registro_uso_v2/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        useCase.deletar(id);
        return ResponseEntity.noContent().build();
    }
}