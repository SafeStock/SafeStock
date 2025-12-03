package com.example.safestock.controller;

import com.example.safestock.model.HistoricoAlertas;
import com.example.safestock.service.HistoricoAlertasService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/historicoAlertas")
public class HistoricoAlertasController {
    private final HistoricoAlertasService historicoAlertasService;

    @GetMapping
    public ResponseEntity<List<HistoricoAlertas>> listarAlertasRecentes() {
        return ResponseEntity.ok(historicoAlertasService.findAlertasRecentes());
    }

    @GetMapping("/paged")
    public ResponseEntity<?> listarPaginado(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "5") int size) {
        var resultado = historicoAlertasService.listarPaginado(page, size);
        return ResponseEntity.ok(new java.util.HashMap<String, Object>() {{
            put("content", resultado.getContent());
            put("page", resultado.getNumber());
            put("size", resultado.getSize());
            put("totalPages", resultado.getTotalPages());
            put("totalElements", resultado.getTotalElements());
        }});
    }

    // Public test endpoint (no security) for local quick checks
    @GetMapping("/public/paged")
    public ResponseEntity<?> listarPaginadoPublic(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "5") int size) {
        return listarPaginado(page, size);
    }


    public HistoricoAlertasController(HistoricoAlertasService historicoAlertasService) {
        this.historicoAlertasService = historicoAlertasService;
    }

    @PostMapping
    public ResponseEntity<HistoricoAlertas> adicionarHistorico(@Valid @RequestBody HistoricoAlertas historicoAlertas){
        HistoricoAlertas novoHistoricoAlerta = historicoAlertasService.cadastrarAlerta(historicoAlertas);
        return ResponseEntity.ok(novoHistoricoAlerta);
    }

    //@GetMapping
    //public List<HistoricoAlertas> listarHistorico(){return historicoAlertasService.listarHistorico();}
}
