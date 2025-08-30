package com.example.safestock.adapter.inbound;

import com.example.safestock.application.service.RegistroUsoService;
import com.example.safestock.domain.model.RegistroUso;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registro-uso")
public class RegistroUsoController {

    private final RegistroUsoService registroUsoService;

    public RegistroUsoController(RegistroUsoService registroUsoService) {
        this.registroUsoService = registroUsoService;
    }

    @PostMapping
    public ResponseEntity<RegistroUso> criar(@RequestBody RegistroUso registroUso) {
        RegistroUso novo = registroUsoService.registrarUso(registroUso);
        return ResponseEntity.ok(novo);
    }

    @GetMapping
    public ResponseEntity<List<RegistroUso>> listar() {
        return ResponseEntity.ok(registroUsoService.listarRegistrosUso());
    }
}
