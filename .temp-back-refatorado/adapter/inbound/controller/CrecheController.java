package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.CrecheRequest;
import com.example.safestock.adapter.inbound.dto.CrecheResponse;
import com.example.safestock.application.port.in.CrecheUseCase;
import com.example.safestock.domain.model.Creche;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/creches")
public class CrecheController {

    private final CrecheUseCase useCase;


    public CrecheController(CrecheUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping
    public ResponseEntity<CrecheResponse> create(@RequestBody @Valid CrecheRequest req) {
        Creche d = new Creche();
        d.setNome(req.getNome());
        d.setEndereco(req.getEndereco());
        d.setTelefone(req.getTelefone());
        d.setCnpj(req.getCnpj());

        Creche saved = useCase.criar(d);
        CrecheResponse resp = new CrecheResponse();
        resp.setId(saved.getId());
        resp.setNome(saved.getNome());
        resp.setEndereco(saved.getEndereco());
        resp.setTelefone(saved.getTelefone());
        resp.setCnpj(saved.getCnpj());

        return ResponseEntity.created(URI.create("/api/creches" + resp.getId())).body(resp);
    }
}
