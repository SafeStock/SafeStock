package com.example.safestock.controller;

import com.example.safestock.model.Funcionario;
import com.example.safestock.model.HistoricoAlertas;
import com.example.safestock.service.HistoricoAlertasService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historicoAlertas")
public class HistoricoAlertasController {
    private final HistoricoAlertasService historicoAlertasService;

    public HistoricoAlertasController(HistoricoAlertasService historicoAlertasService) {
        this.historicoAlertasService = historicoAlertasService;
    }

    @PostMapping
    public ResponseEntity<HistoricoAlertas> adicionarHistorico(@Valid @RequestBody HistoricoAlertas historicoAlertas){
        HistoricoAlertas novoHistoricoAlerta = historicoAlertasService.cadastrarAlerta(historicoAlertas);
        return ResponseEntity.ok(novoHistoricoAlerta);
    }

    @GetMapping
    public List<HistoricoAlertas> listarHistorico(){
        return historicoAlertasService.listarHistorico();
    }
}
