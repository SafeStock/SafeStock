package com.example.safestock.controller;

import com.example.safestock.model.Creche;
import com.example.safestock.service.CrecheService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/creches")
public class CrecheController {

    private final CrecheService crecheService;

    public CrecheController(CrecheService crecheService) {
        this.crecheService = crecheService;
    }

    @GetMapping
    public List<Creche> listarCreches(){
        return crecheService.listarCreches();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Creche> listarCrechePorId(@PathVariable Long id){
        try {
            Creche creche = crecheService.buscarPorId(id); // método que retorna diretamente
            return ResponseEntity.ok(creche);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Creche> adicionarCreche(@Valid @RequestBody Creche creche){
        Creche novaCreche = crecheService.salvarCreche(creche);
        return ResponseEntity.ok(novaCreche);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerCreche(@PathVariable Long id){
        try {
            crecheService.removerCrechePorId(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Creche> atualizarCreche(@PathVariable Long id, @RequestBody Creche novaCreche) {
        return crecheService.atualizarCreche(id, novaCreche)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
