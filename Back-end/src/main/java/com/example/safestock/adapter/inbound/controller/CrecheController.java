package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.CrecheRequest;
import com.example.safestock.adapter.inbound.dto.CrecheResponse;
import com.example.safestock.application.port.in.CrecheUseCase;
import com.example.safestock.domain.model.Creche;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController("crecheControllerV2")
@RequestMapping("/api/creche_v2")
public class CrecheController {

    private final CrecheUseCase useCase;


    public CrecheController(@Qualifier("crecheServiceV2") CrecheUseCase useCase) {
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

        return ResponseEntity.created(URI.create("/api/creche_v2/" + resp.getId())).body(resp);
    }
}
