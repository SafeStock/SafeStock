package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.HistoricoAlertasRequest;
import com.example.safestock.adapter.inbound.dto.HistoricoAlertasResponse;
import com.example.safestock.application.port.in.HistoricoAlertasUseCase;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.Produto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/historico_alertas_v2")
public class HistoricoAlertasController {

    private final HistoricoAlertasUseCase useCase;

    public HistoricoAlertasController(HistoricoAlertasUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping
    public ResponseEntity<HistoricoAlertasResponse> create(@RequestBody @Valid HistoricoAlertasRequest req) {
        HistoricoAlertas d = new HistoricoAlertas();
        d.setDataHora(req.getDataHora());
        d.setStatus(req.getStatus());
        d.setDescricao(req.getDescricao());
        d.setNomeProduto(req.getNomeProduto());

        if (req.getProdutoId() != null) {
            Produto p = new Produto();
            p.setId(req.getProdutoId());
            d.setProduto(p);
        }

        HistoricoAlertas saved = useCase.criar(d);

        HistoricoAlertasResponse resp = new HistoricoAlertasResponse();
        resp.setId(saved.getId());
        resp.setDataHora(saved.getDataHora());
        resp.setStatus(saved.getStatus());
        resp.setDescricao(saved.getDescricao());
        resp.setNomeProduto(saved.getNomeProduto());
        if (saved.getProduto() != null) resp.setProdutoId(saved.getProduto().getId());

        return ResponseEntity.created(URI.create("/api/historico_alertas_v2/" + resp.getId())).body(resp);
    }
}
