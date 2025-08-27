package com.example.safestock.infrastructure.api;

import com.example.safestock.core.domain.RegistroUso;
import com.example.safestock.core.application.usecase.RegistroUsoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/registroUso")
public class RegistroUsoController {
    private final RegistroUsoService registroUsoService;

    public RegistroUsoController(RegistroUsoService registroUsoService) {
        this.registroUsoService = registroUsoService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<RegistroUso> registarUso(@Valid @RequestBody RegistroUso registro){
        RegistroUso novoRegistroUso = registroUsoService.registrarUso(registro);
        return ResponseEntity.ok(novoRegistroUso);
    }

    @GetMapping
    public List<RegistroUso> listarRegistrosUso(){
        return registroUsoService.listarRegistrosUso();
    }

    @DeleteMapping("/testedeletar/{id}")
    public ResponseEntity<Void> deletarRegistroUso(@PathVariable Long id) {
        registroUsoService.deletarRegistroUso(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deletar/{id}")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Void> deletarRegistro(@PathVariable Long id) {
        registroUsoService.deletarRegistro(id);
        return ResponseEntity.noContent().build();
    }
}
