package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.RelatorioRequest;
import com.example.safestock.adapter.inbound.dto.RelatorioResponse;
import com.example.safestock.application.port.in.RelatorioUseCase;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.domain.model.RegistroUso;
import com.example.safestock.domain.model.Relatorio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

    private final RelatorioUseCase useCase;

    public RelatorioController(RelatorioUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping
    public ResponseEntity<RelatorioResponse> create(@RequestBody @Valid RelatorioRequest req) {
        Relatorio d = new Relatorio();
        d.setDataRelatorio(req.getDataRelatorio());

        if (req.getProdutoId() != null) {
            Produto p = new Produto();
            p.setId(req.getProdutoId());
            d.setProduto(p);
        }

        if (req.getRegistroUsoId() != null) {
            RegistroUso ru = new RegistroUso();
            ru.setId(req.getRegistroUsoId());
            d.setRegistroUso(ru);
        }

        if (req.getAlertaId() != null) {
            HistoricoAlertas ha = new HistoricoAlertas();
            ha.setId(req.getAlertaId());
            d.setAlerta(ha);
        }

        Relatorio saved = useCase.criar(d);

        RelatorioResponse resp = new RelatorioResponse();
        resp.setIdRelatorio(saved.getIdRelatorio());
        resp.setDataRelatorio(saved.getDataRelatorio());
        if (saved.getProduto() != null) resp.setProdutoId(saved.getProduto().getId());
        if (saved.getRegistroUso() != null) resp.setRegistroUsoId(saved.getRegistroUso().getId());
        if (saved.getAlerta() != null) resp.setAlertaId(saved.getAlerta().getId());

        return ResponseEntity.created(URI.create("/api/relatorios" + resp.getIdRelatorio())).body(resp);
    }

}